const isOwner = (userId, ownerId) => userId === ownerId

const isPlayerCommandChannel = (channel, allowedChannelId) => {
  if (!allowedChannelId) return true // No restriction
  return channel.id === allowedChannelId
}

const hasRoleCheck = (member, roleId) => {
  return member.roles.cache.has(roleId)
}

module.exports = {
  isOwner,
  isPlayerCommandChannel,
  hasRoleCheck,
}
