const axios = require('axios')
const h = require('./helpers')
const login = require('./login')

const fetchPage = async(page) => {
  const cookie = await login(process.env.CARD_NUMBER, process.env.SURNAME)
  const options = { headers: { 'Cookie': `JSESSIONID=${cookie}`, 'User-Agent': 'wcl.js <https://github.com/marcus-crane/wcl.js>' }}

  if (page === 'fines') {
    await axios.get(`http://www.wcl.govt.nz/carlweb/jsp/Pip?transtype=fines&transtype=losts`, options)
  }

  return await axios.get(`http://www.wcl.govt.nz/carlweb/jsp/pip${page}.jsp`, options)
}

exports.summary = async () => {
  const res = await fetchPage('summary')
  console.log(h.getSummary(res.data))
}

exports.fines = async() => {
  const res = await fetchPage('fines')
  for (fine of h.getFines(res.data)) {
    console.log(`${fine.title} by ${fine.author} was due back on ${fine.dueDate}.\nYou returned it on ${fine.returnDate} but still owe ${fine.fineAmount}`)
  }
}