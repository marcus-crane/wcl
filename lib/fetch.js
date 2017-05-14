const axios = require('axios')
const h = require('./helpers')
const login = require('./login')

exports.summary = async () => {
  const cookie = await login(process.env.CARD_NUMBER, process.env.SURNAME)
  const res = await axios.get(`${process.env.BASEURL}/pipsummary.jsp`, { headers: { 'Cookie': `JSESSIONID=${cookie}` }})
  console.log(h.getSummary(res.data))
}