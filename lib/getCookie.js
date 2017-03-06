const axios = require('axios')

module.exports = function getCookie() {
    return axios.get('http://www.wcl.govt.nz/carlweb/jsp/piplogin.jsp')
    .then((res) => {
        return res.headers['set-cookie'][0].slice(0, 43)
    })
    .catch(() => {
        console.error('Are you offline? I couldn\'t seem to find the login page')
    })
}