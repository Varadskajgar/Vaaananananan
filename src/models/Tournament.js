const mongoose = require("mongoose")

const tournamentSchema = new mongoose.Schema({
  tournamentId: { type: String, unique: true, required: true },
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  startTime: Date,
  endTime: Date,
  mode: { type: String, enum: ["BR", "CS", "LW"], required: true },
  players: [String], // User IDs
  maxPlayers: Number,
  theme: { type: String, default: "#5865F2" },
  locked: { type: Boolean, default: false },
  prize: { type: Number, default: 0 },
  teams: [
    {
      teamId: String,
      members: [String],
      placement: Number,
    },
  ],
  status: { type: String, enum: ["active", "ongoing", "completed", "cancelled"], default: "active" },
})

module.exports = mongoose.model("Tournament", tournamentSchema)
