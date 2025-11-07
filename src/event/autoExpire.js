const Tournament = require("../models/Tournament")

const startAutoExpire = () => {
  setInterval(async () => {
    try {
      const now = new Date()

      const expiredTournaments = await Tournament.updateMany(
        { endTime: { $lte: now }, status: "active" },
        { status: "completed" },
      )

      if (expiredTournaments.modifiedCount > 0) {
        console.log(`✅ Auto-expired ${expiredTournaments.modifiedCount} tournaments`)
      }
    } catch (error) {
      console.error("Auto-expire error:", error)
    }
  }, 600000) // Check every 10 minutes
}

module.exports = { startAutoExpire }
