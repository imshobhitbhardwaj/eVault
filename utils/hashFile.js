const crypto = require("crypto");

module.exports = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};