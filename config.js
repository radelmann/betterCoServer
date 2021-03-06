module.exports = {
  'secret': process.env.SESSION_SECRET || 'dev-secret',
  'port': process.env.BETTER_CO_SERVER_PROD_PORT || 3000,
  'db_url': process.env.BETTER_CO_SERVER_PROD_DB_URL || 'mongodb://localhost:bettercoServer/bettercoServer'
}