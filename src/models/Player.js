const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  username: String,
  stats: {
    totalJoins: { type: Number, default: 0 },
    totalWins: { type: Number, default: 0 },
    referralCount: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    discountBalance: { type: Number, default: 0 },
    bonusPoints: { type: Number, default: 0 },
  },
  achievements: {
    badges: [String],
    milestones: [String],
  },
  dmNotifications: { type: Boolean, default: true },
  registeredAt: { type: Date, default: Date.now },
  tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tournament" }],
  paymentVerified: { type: Boolean, default: false },
})

module.exports = mongoose.model("Player", playerSchema)
