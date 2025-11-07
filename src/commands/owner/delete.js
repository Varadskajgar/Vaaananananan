const { SlashCommandBuilder } = require("discord.js")
const Tournament = require("../../models/Tournament")
const { isOwner } = require("../../utils/permissions")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Delete a tournament")
    .addStringOption((option) => option.setName("id").setDescription("Tournament ID").setRequired(true)),

  async execute(interaction) {
    if (!isOwner(interaction.user.id, process.env.OWNER_ID)) {
      return interaction.reply({ content: "❌ Owner only", ephemeral: true })
    }

    const tourId = interaction.options.getString("id")

    try {
      const result = await Tournament.deleteOne({ tournamentId: tourId })

      if (result.deletedCount === 0) {
        return interaction.reply({ content: "❌ Tournament not found", ephemeral: true })
      }

      await interaction.reply({ content: `✅ Tournament \`${tourId}\` deleted`, ephemeral: true })
    } catch (error) {
      console.error("Error deleting tournament:", error)
      await interaction.reply({ content: "❌ Error deleting tournament", ephemeral: true })
    }
  },
}
