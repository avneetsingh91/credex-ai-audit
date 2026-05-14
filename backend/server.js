const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const auditRoutes = require("./routes/auditRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use("/api/audit", auditRoutes);

app.get("/", (req, res) => {
  res.send("Credex AI Spend Audit API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);