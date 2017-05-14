const login = require('./lib/login')
require('dotenv').config()

const summary = async () => {
  let summary = await login(process.env.CARD_NUMBER, process.env.SURNAME)
  console.log(summary)
}

summary()