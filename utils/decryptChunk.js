const crypto = require("crypto");

const key = Buffer.from(process.env.ENCRYPTION_KEY);

module.exports = (buffer) => {
  const iv = buffer.slice(0, 16);
  const data = buffer.slice(16);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  return Buffer.concat([
    decipher.update(data),
    decipher.final()
  ]);
};