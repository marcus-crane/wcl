const axios = require('axios')
const qs = require('querystring')

const baseURL = 'http://www.wcl.govt.nz/carlweb/jsp'

const getSession = async (account, surname) => {
  let session = await axios.post(`${baseURL}/Pip`, qs.stringify({ pid: account, name: surname }))
  return session.request.path.slice(44)
}

const login = async (card, surname) => {
  const cookie = await getSession(card, surname)
  let summary = await axios.get(`${baseURL}/pipsummary.jsp`)
  console.log(summary.data)
}

module.exports = login