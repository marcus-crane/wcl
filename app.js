const axios = require('axios')
const env = require('dotenv').config()
const viewAccount = require('./lib/viewAccount')

viewAccount('loans')
.then((loans) => {
    // Problem is that account content is loaded vs JS and so isn't included in the response
    console.log(loans)
})
.catch((err) => {
    console.error(err)
})