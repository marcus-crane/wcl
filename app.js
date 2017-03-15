// const axios = require('axios')
// const env = require('dotenv').config()
// const viewAccount = require('./lib/viewAccount')

// viewAccount('loans')
// .then((loans) => {
//     // Problem is that account content is loaded vs JS and so isn't included in the response
//     console.log(loans)
// })
// .catch((err) => {
//     console.error(err)
// })

const axios = require('axios')
const cheerio = require('cheerio')

axios.get('http://www.wcl.govt.nz/carlweb/jsp/pipcharges.jsp', {
    headers: {
        Cookie: 'JSESSIONID=F7D1682F11E8CF976E77C21409868CCE'
    }
})
.then((res) => {
    let $ = cheerio.load(res.data, { xmlMode: false })
    let unfilteredCharges = $('script').text()
    let regex = /\s\[([^]+)\s]/gm
    //console.log(res)
    let charges = unfilteredCharges.match(regex)[0]
})
.catch((err) => {
    console.log(err)
})