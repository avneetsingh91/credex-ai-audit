const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    email: String,
    company: String,
    role: String,
    teamSize: Number,
    auditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audit",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);