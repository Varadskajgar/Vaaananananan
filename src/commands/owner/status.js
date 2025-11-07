const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Tournament = require("../../models/Tournament")
const { isOwner } = require("../../utils/permissions")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Show full tournament info")
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

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`📊 Tournament Status - ${tourId}`)
        .addFields(
          { name: "Mode", value: tournament.mode, inline: true },
          { name: "Status", value: tournament.status, inline: true },
          { name: "Locked", value: tournament.locked ? "🔒 Yes" : "🔓 No", inline: true },
          { name: "Players", value: `${tournament.players.length}/${tournament.maxPlayers}`, inline: true },
          { name: "Prize Pool", value: `$${tournament.prize}`, inline: true },
          { name: "Created By", value: `<@${tournament.createdBy}>`, inline: true },
          { name: "Start Time", value: tournament.startTime.toLocaleString(), inline: false },
          { name: "End Time", value: tournament.endTime.toLocaleString(), inline: false },
        )

      await interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      console.error("Error fetching status:", error)
      await interaction.reply({ content: "❌ Error fetching status", ephemeral: true })
    }
  },
}
