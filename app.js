const axios = require('axios')
const env = require('dotenv').config()
const viewAccount = require('./lib/viewAccount')

viewAccount()
.then((account) => {
    console.log(account.loans)
    console.log(account.fees)
})