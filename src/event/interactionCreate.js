const fs = require("fs")
const path = require("path")

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    // Handle button interactions
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("join_")) {
        const tourId = interaction.customId.split("_")[1]
        const Tournament = require("../models/Tournament")

        try {
          const tournament = await Tournament.findOne({ tournamentId: tourId })

          if (!tournament) {
            return interaction.reply({ content: "❌ Tournament not found", ephemeral: true })
          }

          if (tournament.locked) {
            return interaction.reply({ content: "🔒 Tournament is locked", ephemeral: true })
          }

          if (tournament.players.includes(interaction.user.id)) {
            return interaction.reply({ content: "✅ You already joined", ephemeral: true })
          }

          tournament.players.push(interaction.user.id)
          await tournament.save()

          await interaction.reply({ content: `✅ Joined tournament \`${tourId}\`!`, ephemeral: true })
        } catch (error) {
          console.error("Error joining tournament:", error)
          await interaction.reply({ content: "❌ Error joining", ephemeral: true })
        }
      }
    }

    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const commandPath = path.join(
        __dirname,
        "..",
        "commands",
        interaction.user.id === process.env.OWNER_ID ? "owner" : "player",
        `${interaction.commandName}.js`,
      )

      if (fs.existsSync(commandPath)) {
        const command = require(commandPath)
        try {
          await command.execute(interaction)
        } catch (error) {
          console.error("Command error:", error)
          await interaction.reply({ content: "❌ Error executing command", ephemeral: true })
        }
      }
    }
  },
}
