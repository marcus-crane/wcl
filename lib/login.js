const axios = require('axios')
const fs = require('fs')
const qs = require('querystring')
const h = require('./helpers')

const baseURL = 'http://www.wcl.govt.nz/carlweb/jsp'

const getCookie = async (account, surname) => {
  const session = await axios.post(`${baseURL}/Pip`, qs.stringify({ pid: account, name: surname }))
  fs.writeFileSync('cookie.txt', session.request.path.slice(44))
  return session.request.path.slice(44)
}

const readCookie = () => {
  return fs.readFileSync('cookie.txt')
}

const login = async (card, surname) => {
  const cookie = readCookie()
  const res = await axios.get(`${baseURL}/pipsummary.jsp`, { headers: { 'Cookie': `JSESSIONID=${cookie}` }})
  h.parseSummary(res.data)
}

module.exports = login