const axios = require('axios')
const env = require('dotenv').config()
const viewAccount = require('./lib/viewAccount')

viewAccount('loans')
.then((loans) => {
    console.log(loans)
})