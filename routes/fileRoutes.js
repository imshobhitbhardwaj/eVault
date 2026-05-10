const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const auth = require("../middleware/authMiddleware");
const encrypt = require("../utils/encryptChunk");
const decrypt = require("../utils/decryptChunk");
const File = require("../models/File");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const buffer = fs.readFileSync(req.file.path);

  const chunkSize = 1024 * 1024;
  const chunks = [];

  for (let i = 0; i < buffer.length; i += chunkSize) {
    const chunk = buffer.slice(i, i + chunkSize);
    const enc = encrypt(chunk);

    const name = Date.now() + "_" + i + ".enc";

    fs.writeFileSync(path.join("uploads", name), enc);

    chunks.push(name);
  }

  await File.create({
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    chunks,
    uploadedBy: req.user.id
  });

  fs.unlinkSync(req.file.path);

  res.json({ message: "Uploaded successfully" });
});

router.get("/files", auth, async (req, res) => {
  const files = await File.find({ uploadedBy: req.user.id });
  res.json(files);
});

router.get("/download/:id", auth, async (req, res) => {
  const file = await File.findById(req.params.id);

  let buffers = [];

  for (let c of file.chunks) {
    const enc = fs.readFileSync(path.join("uploads", c));
    const dec = decrypt(enc);
    buffers.push(dec);
  }

  const final = Buffer.concat(buffers);

  res.setHeader("Content-Type", file.mimeType);
  res.setHeader("Content-Disposition", `attachment; filename="${file.originalName}"`);

  res.send(final);
});

module.exports = router;