const { nanoid } = require("nanoid");
const Audit = require("../models/Audit");
const runAuditEngine = require("../services/auditEngine");

const Lead = require("../models/Lead");
const generateSummary = require("../services/aiSummary");

const createAudit = async (req, res) => {
  try {
    const { tools, teamSize, useCase } = req.body;

    const result = runAuditEngine(tools, teamSize);

    const summary = await generateSummary({
      tools,
      teamSize,
      result,
    });

    const audit = await Audit.create({
      shareId: nanoid(10),
      tools,
      teamSize,
      useCase,
      totalMonthlySavings: result.monthly,
      totalAnnualSavings: result.annual,
      recommendations: result.recommendations,
      aiSummary: summary,
    });

    res.status(201).json(audit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuditByShareId = async (req, res) => {
  try {
    const audit = await Audit.findOne({
      shareId: req.params.shareId,
    });

    res.json(audit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveLead = async (req, res) => {
  try {
    const { email, company, role, teamSize, auditId } = req.body;

    const lead = await Lead.create({
      email,
      company,
      role,
      teamSize,
      auditId,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAudit,
  getAuditByShareId,
  saveLead
};