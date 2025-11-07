const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
  tournamentId: String,
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: String,
  placement: [
    {
      position: Number,
      players: [String],
      prize: Number,
    },
  ],
  notes: String,
})

module.exports = mongoose.model("Result", resultSchema)
