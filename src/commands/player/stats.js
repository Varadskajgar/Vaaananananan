const { SlashCommandBuilder } = require("discord.js")
const Player = require("../../models/Player")
const { createPlayerStatsEmbed } = require("../../utils/embeds")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Show player stats")
    .addUserOption((option) => option.setName("user").setDescription("Player to check").setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user

    try {
      let player = await Player.findOne({ userId: user.id })

      if (!player) {
        player = new Player({
          userId: user.id,
          username: user.username,
        })
        await player.save()
      }

      const embed = createPlayerStatsEmbed(player)
      await interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      console.error("Error fetching stats:", error)
      await interaction.reply({ content: "❌ Error fetching stats", ephemeral: true })
    }
  },
}
