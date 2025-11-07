const mongoose = require("mongoose")

const auditSchema = new mongoose.Schema({
  tournamentId: String,
  action: String, // 'join', 'leave', 'payment_verified', 'team_assigned', etc.
  userId: String,
  timestamp: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model("AuditLog", auditSchema)
