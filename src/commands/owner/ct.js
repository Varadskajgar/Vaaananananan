const { SlashCommandBuilder } = require("discord.js")
const Tournament = require("../../models/Tournament")
const { createTournamentEmbed } = require("../../utils/embeds")
const { createTournamentJoinButton } = require("../../utils/buttons")
const { generateTournamentId } = require("../../utils/helpers")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ct")
    .setDescription("Create a tournament")
    .addIntegerOption((option) =>
      option.setName("time").setDescription("Tournament start time (minutes from now)").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Game mode")
        .setRequired(true)
        .addChoices(
          { name: "Battle Royale", value: "BR" },
          { name: "Counter-Strike", value: "CS" },
          { name: "League of Legends", value: "LW" },
        ),
    ),

  async execute(interaction) {
    const tourId = generateTournamentId()
    const minutesFromNow = interaction.options.getInteger("time")
    const mode = interaction.options.getString("mode")
    const startTime = new Date(Date.now() + minutesFromNow * 60000)

    try {
      const tournament = new Tournament({
        tournamentId: tourId,
        createdBy: interaction.user.id,
        startTime,
        endTime: new Date(startTime.getTime() + 3600000), // 1 hour duration
        mode,
        maxPlayers: 64,
        status: "active",
      })

      await tournament.save()

      const embed = createTournamentEmbed(tournament)
      const buttons = createTournamentJoinButton(tourId)

      await interaction.reply({
        embeds: [embed],
        components: [buttons],
        ephemeral: false,
      })

      // Post to announcement channel
      if (process.env.TOURNAMENT_ANNOUNCEMENT_CHANNEL_ID) {
        const channel = await interaction.client.channels.fetch(process.env.TOURNAMENT_ANNOUNCEMENT_CHANNEL_ID)
        await channel.send({ embeds: [embed], components: [buttons] })
      }
    } catch (error) {
      console.error("Error creating tournament:", error)
      await interaction.reply({ content: "❌ Error creating tournament", ephemeral: true })
    }
  },
}
