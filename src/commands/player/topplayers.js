const { SlashCommandBuilder } = require("discord.js")
const Player = require("../../models/Player")
const { createLeaderboardEmbed } = require("../../utils/embeds")

module.exports = {
  data: new SlashCommandBuilder().setName("topplayers").setDescription("Show leaderboard"),

  async execute(interaction) {
    try {
      const players = await Player.find().sort({ "stats.totalWins": -1 }).limit(10)

      if (players.length === 0) {
        return interaction.reply({ content: "❌ No players yet", ephemeral: true })
      }

      const embed = createLeaderboardEmbed(players)
      await interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
      await interaction.reply({ content: "❌ Error fetching leaderboard", ephemeral: true })
    }
  },
}
