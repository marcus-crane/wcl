const axios = require('axios')
const cheerio = require('cheerio')

module.exports = function fetchSummary(cookie) {
    return axios.get('http://www.wcl.govt.nz/carlweb/jsp/pipsummary_page.jsp', {
        headers: {
            'Cookie': cookie
        }
    })
    .then((userSummary) => {
        let $ = cheerio.load(userSummary.data)
        let headers = ['loans', 'overdue', 'reserves', 'charges', 'fees', 'status']
        let account = {}
        
        $('td[class=lineItemData]').each((i, element) => {
            account[headers[i]] = $(element).text().trim()
        })

        return account
    })
    .catch((err) => {
        console.error(err)
    })
}