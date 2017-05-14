const login = require('./lib/login')
require('dotenv').config()

login(process.env.CARD_NUMBER, process.env.SURNAME)

