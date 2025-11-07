const Tournament = require("../models/Tournament")
const Player = require("../models/Player")
const Result = require("../models/Result")
const fs = require("fs")
const path = require("path")

const createBackup = async () => {
  try {
    const tournaments = await Tournament.find()
    const players = await Player.find()
    const results = await Result.find()

    const backup = {
      tournaments,
      players,
      results,
      timestamp: new Date(),
      version: "1.0",
    }

    const backupPath = path.join(__dirname, `backup_${Date.now()}.json`)
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2))

    console.log(`✅ Backup created: ${backupPath}`)
    return backupPath
  } catch (error) {
    console.error("Backup error:", error)
  }
}

module.exports = { createBackup }
