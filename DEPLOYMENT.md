# Discord Tournament Bot Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Discord bot token
- Render.com account (for hosting)

## Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with credentials
4. Run: `npm start`

## MongoDB Setup
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to `.env` as `MONGODB_URI`

## Discord Bot Setup
1. Go to Discord Developer Portal
2. Create new application
3. Create bot user
4. Copy token to `.env`
5. Set intents: Message Content, Guild Messages, Direct Messages
6. Set slash command permissions for owner
7. Invite bot to server

## Render Deployment
1. Push code to GitHub
2. Connect GitHub to Render
3. Create Web Service
4. Set environment variables
5. Set start command: `npm start`
6. Deploy!

## Scalability Notes
- MongoDB indexes on tournamentId, userId for fast queries
- Background handlers run in separate intervals
- Button interactions cached for 15 minutes
- Consider Redis for session caching at scale

## Security
- All owner commands check OWNER_ID
- Permissions validated on interaction
- MongoDB connection uses SSL
- Environment variables never logged
