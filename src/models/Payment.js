const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  userId: String,
  tournamentId: String,
  verified: { type: Boolean, default: false },
  verifiedBy: String,
  verifiedAt: Date,
  proofUrl: String,
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Payment", paymentSchema)
