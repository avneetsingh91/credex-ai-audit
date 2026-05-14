const express = require("express");
const router = express.Router();

const {
  createAudit,
  getAuditByShareId,
   saveLead,
} = require("../controllers/auditController");

router.post("/create", createAudit);
router.get("/:shareId", getAuditByShareId);
router.post("/lead", saveLead);

module.exports = router;



