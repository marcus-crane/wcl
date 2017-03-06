const axios = require('axios')
const getCookie = require('./getCookie')

module.exports = function login(cardNumber, lastName) {
    return getCookie()
    .then((userCookie) => {
        return axios.post(`http://wcl.govt.nz/carlweb/jsp/Pip?pid=${cardNumber}&name=${lastName}&enter=Enter`)
    })
    .then((res) => {
        return res.request['_options'].path.slice(33)
    })
    .catch((err) => {
        console.log(err)
    })
}