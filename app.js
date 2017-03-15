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
const fs = require('fs')

axios.get('http://www.wcl.govt.nz/carlweb/jsp/pipcharges.jsp', {
    headers: {
        Cookie: 'JSESSIONID=F7D1682F11E8CF976E77C21409868CCE'
    }
})
.then((res) => {
    let $ = cheerio.load(res.data, { xmlMode: false })
    let unfilteredCharges = $('script').text()
    let loansRegex = /\s\[([^]+)\s]/gm
    let itemsRegex = /{([\s\S]+?)}/gm
    let keysRegex = /\w+(?=:)/g
    //console.log(res)
    let chargesArray = unfilteredCharges.match(loansRegex)[0]
    let chargesObjects = chargesArray.match(itemsRegex)

    for (let i = 0; i < chargesObjects.length; i++) {
        chargesObjects[i] = chargesObjects[i].replace(keysRegex, function(match) {
            if (match !== 'http') {
                return `"${match}"`
            } else {
                return match
            }
        })
    }

    let books = JSON.parse('[' + chargesObjects + ']')
    console.log(books[0].author)
})
.catch((err) => {
    console.log(err)
})