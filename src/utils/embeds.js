const { EmbedBuilder } = require("discord.js")

const createTournamentEmbed = (tournament, theme = "#5865F2") => {
  const formattedTime = tournament.startTime.toLocaleString()

  return new EmbedBuilder()
    .setColor(theme)
    .setTitle(`🎮 ${tournament.mode} Tournament`)
    .setDescription(`**Tournament ID:** \`${tournament.tournamentId}\``)
    .addFields(
      { name: "⏰ Start Time", value: formattedTime, inline: true },
      {
        name: "👥 Players",
        value: `${tournament.players.length}/${tournament.maxPlayers || "Unlimited"}`,
        inline: true,
      },
      { name: "🎯 Mode", value: tournament.mode, inline: true },
      { name: "💰 Prize Pool", value: `$${tournament.prize}`, inline: true },
      { name: "📊 Status", value: tournament.status.toUpperCase(), inline: true },
      { name: "🔒 Locked", value: tournament.locked ? "🔒 Yes" : "🔓 No", inline: true },
    )
    .setFooter({ text: "React with ✅ to join!" })
    .setTimestamp()
}

const createPlayerStatsEmbed = (player) => {
  return new EmbedBuilder()
    .setColor("#5865F2")
    .setTitle(`📊 ${player.username} Stats`)
    .addFields(
      { name: "🎮 Tournaments Joined", value: `${player.stats.totalJoins}`, inline: true },
      { name: "🏆 Total Wins", value: `${player.stats.totalWins}`, inline: true },
      { name: "👥 Referrals", value: `${player.stats.referralCount}`, inline: true },
      { name: "💳 Discount Balance", value: `$${player.stats.discountBalance}`, inline: true },
      { name: "⭐ Bonus Points", value: `${player.stats.bonusPoints}`, inline: true },
      { name: "📅 Member Since", value: player.registeredAt.toLocaleDateString(), inline: true },
    )
}

const createLeaderboardEmbed = (players) => {
  const sorted = players.sort((a, b) => b.stats.totalWins - a.stats.totalWins).slice(0, 10)

  let description = ""
  sorted.forEach((p, idx) => {
    description += `**${idx + 1}.** ${p.username} - 🏆 ${p.stats.totalWins} wins | 🎮 ${p.stats.totalJoins} tournaments\n`
  })

  return new EmbedBuilder().setColor("#FFD700").setTitle("🏆 Global Leaderboard").setDescription(description)
}

const createConfirmEmbed = (type, details) => {
  return new EmbedBuilder()
    .setColor("#00B050")
    .setTitle(`✅ ${type} Confirmed`)
    .setDescription(`Details: ${JSON.stringify(details, null, 2)}`)
    .setTimestamp()
}

module.exports = {
  createTournamentEmbed,
  createPlayerStatsEmbed,
  createLeaderboardEmbed,
  createConfirmEmbed,
}
