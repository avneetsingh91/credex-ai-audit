const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    shareId: {
      type: String,
      required: true,
      unique: true,
    },

    tools: [
      {
        name: String,
        plan: String,
        spend: Number,
        seats: Number,
      },
    ],

    teamSize: Number,
    useCase: String,

    totalMonthlySavings: Number,
    totalAnnualSavings: Number,

    recommendations: [
      {
        tool: String,
        action: String,
        savings: Number,
        reason: String,
      },
    ],

    aiSummary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audit", auditSchema);