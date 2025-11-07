const Tournament = require("../models/Tournament")
const Player = require("../models/Player")
const AuditLog = require("../models/AuditLog")

const startReminderHandler = (client) => {
  setInterval(async () => {
    try {
      const now = new Date()
      const oneHourLater = new Date(now.getTime() + 3600000)

      const upcomingTournaments = await Tournament.find({
        startTime: { $gte: now, $lte: oneHourLater },
        status: "active",
      })

      for (const tournament of upcomingTournaments) {
        for (const playerId of tournament.players) {
          const player = await Player.findOne({ userId: playerId })

          if (player && player.dmNotifications) {
            try {
              const user = await client.users.fetch(playerId)
              await user.send({
                content: `⏰ Reminder: Tournament \`${tournament.tournamentId}\` starts in 1 hour! (${tournament.startTime.toLocaleTimeString()})`,
              })

              await AuditLog.create({
                tournamentId: tournament.tournamentId,
                action: "reminder_sent",
                userId: playerId,
                details: { type: "1hour_reminder" },
              })
            } catch (error) {
              console.error(`Failed to send reminder to ${playerId}:`, error)
            }
          }
        }
      }
    } catch (error) {
      console.error("Reminder handler error:", error)
    }
  }, 300000) // Check every 5 minutes
}

module.exports = { startReminderHandler }
