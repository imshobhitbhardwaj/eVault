const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  chunks: [String],
  uploadedBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", fileSchema);