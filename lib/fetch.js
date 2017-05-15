const axios = require('axios')
const h = require('./helpers')
const login = require('./login')

const fetchPage = async(page) => {
  const cookie = await login(process.env.CARD_NUMBER, process.env.SURNAME)

  if (page === 'fines') {
    await axios.get(`${process.env.BASEURL}/Pip?transtype=fines&transtype=losts`, { headers: { 'Cookie': `JSESSIONID=${cookie}` }})
  }

  return await axios.get(`${process.env.BASEURL}/pip${page}.jsp`, { headers: { 'Cookie': `JSESSIONID=${cookie}` }})
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