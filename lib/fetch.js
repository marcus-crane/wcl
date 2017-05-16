const axios = require('axios')
const fs = require('fs')
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
  const summary = h.getSummary(res.data)
  console.log(summary)
}

exports.loans = async() => {
  const res = await fetchPage('charges')
  const loans = h.getLoans(res.data)

  if (!loans) {
    console.log('You do not have any loans checked out.')
  } else {
    for (loan of loans) {
      console.log(`You checked out ${loan.title} by ${loan.author} on ${loan.date1}.\nRemember to return it before ${loan.dueDate} to the ${loan.branchName} branch!`)
    }
  }
}

exports.fines = async() => {
  const res = await fetchPage('fines')
  const fines = h.getFines(res.data)

  if (!fines) {
    console.log('You do not have any charges, fees or lost items.')
  } else {
    for (fine of fines) {
      console.log(`${fine.title} by ${fine.author} was due back on ${fine.dueDate}.\nYou returned it on ${fine.returnDate} but still owe ${fine.fineAmount}`)
    }
  }
}
