const axios = require('axios')
const cheerio = require('cheerio')

module.exports = function fetchLoans(cookie) {
    return axios.get('http://www.wcl.govt.nz/carlweb/jsp/pipcharges.jsp', {
        headers: {
            'Cookie': cookie
        }
    })
    .then((userLoans) => {
        return userLoans
    })
    .catch((err) => {
        console.error(err)
    })
}