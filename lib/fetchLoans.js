const axios = require('axios')
const cheerio = require('cheerio')

module.exports = function fetchLoans(cookie) {
    return axios.get(`http://wcl.govt.nz/carlweb/jsp/pipcharges.jsp;${cookie}`)
    .then((userLoans) => {
        console.log(userLoans)
    })
    .catch((err) => {
        console.error(err)
    })
}