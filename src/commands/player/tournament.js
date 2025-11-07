const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Tournament = require("../../models/Tournament")
const { createTournamentJoinButton } = require("../../utils/buttons")

module.exports = {
  data: new SlashCommandBuilder().setName("tournament").setDescription("Show today's tournaments"),

  async execute(interaction) {
    try {
      const now = new Date()
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

      const tournaments = await Tournament.find({
        startTime: { $gte: now, $lte: endOfDay },
        status: "active",
      })

      if (tournaments.length === 0) {
        return interaction.reply({ content: "❌ No tournaments today", ephemeral: true })
      }

      const embeds = tournaments.map((t) => {
        const embed = new EmbedBuilder()
          .setColor(t.theme || "#5865F2")
          .setTitle(`🎮 ${t.mode} Tournament`)
          .setDescription(`**ID:** \`${t.tournamentId}\``)
          .addFields(
            { name: "⏰ Start Time", value: t.startTime.toLocaleTimeString(), inline: true },
            { name: "👥 Players", value: `${t.players.length}/${t.maxPlayers}`, inline: true },
            { name: "💰 Prize", value: `$${t.prize}`, inline: true },
          )
        return embed
      })

      const components = tournaments.map((t) => createTournamentJoinButton(t.tournamentId))

      await interaction.reply({
        embeds: [embeds[0]],
        components: [components[0]],
        ephemeral: true,
      })
    } catch (error) {
      console.error("Error fetching tournaments:", error)
      await interaction.reply({ content: "❌ Error fetching tournaments", ephemeral: true })
    }
  },
}
