const generateTournamentId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const generateReferralCode = (userId) => {
  return `REF_${userId}_${Math.random().toString(36).substring(7).toUpperCase()}`
}

const formatTimeRemaining = (endTime) => {
  const now = Date.now()
  const remaining = endTime - now
  const hours = Math.floor(remaining / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  return `${hours}h ${minutes}m`
}

module.exports = {
  generateTournamentId,
  generateReferralCode,
  formatTimeRemaining,
}
