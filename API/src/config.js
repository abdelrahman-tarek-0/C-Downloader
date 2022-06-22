const dotenv = require('dotenv')
dotenv.config()

module.exports = {
   port: process.env.PORT || 3000,
   url: process.env.URL || 'http://localhost:3000',
   publicCookie: process.env.PUBLIC_COOKIE,
}
