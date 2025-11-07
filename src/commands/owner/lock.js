const { SlashCommandBuilder } = require("discord.js")
const Tournament = require("../../models/Tournament")
const { isOwner } = require("../../utils/permissions")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Lock tournament from new joins")
    .addStringOption((option) => option.setName("id").setDescription("Tournament ID").setRequired(true)),

  async execute(interaction) {
    if (!isOwner(interaction.user.id, process.env.OWNER_ID)) {
      return interaction.reply({ content: "❌ Owner only", ephemeral: true })
    }

    const tourId = interaction.options.getString("id")

    try {
      const tournament = await Tournament.findOneAndUpdate({ tournamentId: tourId }, { locked: true }, { new: true })

      if (!tournament) {
        return interaction.reply({ content: "❌ Tournament not found", ephemeral: true })
      }

      await interaction.reply({ content: `🔒 Tournament \`${tourId}\` is now locked`, ephemeral: true })
    } catch (error) {
      console.error("Error locking tournament:", error)
      await interaction.reply({ content: "❌ Error locking tournament", ephemeral: true })
    }
  },
}
