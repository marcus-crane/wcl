const axios = require('axios')

module.exports = function login(cardNumber, lastName) {
    return axios.post(`http://wcl.govt.nz/carlweb/jsp/Pip?pid=${cardNumber}&name=${lastName}`)
    .then((res) => {
        return `JSESSIONID=${res.request['_options'].path.slice(44)}`
    })
    .catch((err) => {
        console.error(err)
    })
}