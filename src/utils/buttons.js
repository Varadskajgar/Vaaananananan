const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

const createTournamentJoinButton = (tournamentId) => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`join_${tournamentId}`)
      .setLabel("Join Tournament")
      .setStyle(ButtonStyle.Success)
      .setEmoji("✅"),
    new ButtonBuilder()
      .setCustomId(`info_${tournamentId}`)
      .setLabel("Info")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("ℹ️"),
  )
}

const createConfirmationButtons = () => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("confirm_yes").setLabel("Confirm").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("confirm_no").setLabel("Cancel").setStyle(ButtonStyle.Danger),
  )
}

module.exports = {
  createTournamentJoinButton,
  createConfirmationButtons,
}
