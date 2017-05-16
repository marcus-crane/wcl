const axios = require('axios')
const fs = require('fs')
const qs = require('querystring')

const getCookie = async (account, surname) => {
  const options = { headers: { 'User-Agent': 'wcl.js <https://github.com/marcus-crane/wcl.js>' }}
  const session = await axios.post('http://www.wcl.govt.nz/carlweb/jsp/Pip', qs.stringify({ pid: account, name: surname }), options)
  fs.writeFileSync('cookie.txt', session.request.path.slice(44))
  return session.request.path.slice(44)
}

const readCookie = () => {
  return fs.readFileSync('cookie.txt')
}

const login = async (card, surname) => {
  return await getCookie(card, surname)
}

module.exports = {
  getCookie,
  login
}