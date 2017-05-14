const axios = require('axios')
const fs = require('fs')
const qs = require('querystring')

const getCookie = async (account, surname) => {
  const session = await axios.post(`${process.env.BASEURL}/Pip`, qs.stringify({ pid: account, name: surname }))
  fs.writeFileSync('cookie.txt', session.request.path.slice(44))
  return session.request.path.slice(44)
}

const readCookie = () => {
  return fs.readFileSync('cookie.txt')
}

const login = async (card, surname) => {
  const cookie = await getCookie(card, surname)
  return cookie
}

module.exports = login