const crypto = require("crypto");

const key = Buffer.from(process.env.ENCRYPTION_KEY);

module.exports = (buffer) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  return Buffer.concat([
    iv,
    cipher.update(buffer),
    cipher.final()
  ]);
};