require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});