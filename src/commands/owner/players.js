const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Tournament = require("../../models/Tournament")
const { isOwner } = require("../../utils/permissions")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("List all joined players")
    .addStringOption((option) => option.setName("id").setDescription("Tournament ID").setRequired(true)),

  async execute(interaction) {
    if (!isOwner(interaction.user.id, process.env.OWNER_ID)) {
      return interaction.reply({ content: "❌ Owner only", ephemeral: true })
    }

    const tourId = interaction.options.getString("id")

    try {
      const tournament = await Tournament.findOne({ tournamentId: tourId })

      if (!tournament) {
        return interaction.reply({ content: "❌ Tournament not found", ephemeral: true })
      }

      const playerList = tournament.players.map((p, idx) => `${idx + 1}. <@${p}>`).join("\n") || "No players joined yet"

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`👥 Players in Tournament ${tourId}`)
        .setDescription(playerList)
        .addFields({ name: "Total", value: `${tournament.players.length}/${tournament.maxPlayers}` })

      await interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      console.error("Error fetching players:", error)
      await interaction.reply({ content: "❌ Error fetching players", ephemeral: true })
    }
  },
}
