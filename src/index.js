require("dotenv").config()
const { Client, GatewayIntentBits, Collection } = require("discord.js")
const fs = require("fs")
const path = require("path")
const connectDB = require("./database/connection")
const { startReminderHandler } = require("./events/reminderHandler")
const { startAutoExpire } = require("./events/autoExpire")
const express = require("express")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.commands = new Collection()

// Load commands
const commandDirs = ["owner", "player"]
for (const dir of commandDirs) {
  const commandPath = path.join(__dirname, "commands", dir)
  if (fs.existsSync(commandPath)) {
    const commands = fs.readdirSync(commandPath).filter((f) => f.endsWith(".js"))
    for (const file of commands) {
      const command = require(path.join(commandPath, file))
      client.commands.set(command.data.name, command)
    }
  }
}

// Load events
const eventsPath = path.join(__dirname, "events")
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((f) => f.endsWith(".js") && f !== "reminderHandler.js" && f !== "autoExpire.js")

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file))
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// Connect to MongoDB
connectDB()

// Start background handlers
startReminderHandler(client)
startAutoExpire()

// Express uptime server
const app = express()
app.get("/", (req, res) => {
  res.json({ status: "Bot is running", timestamp: new Date() })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🌐 Express server running on port ${PORT}`)
})

// Login
client.login(process.env.DISCORD_TOKEN)
