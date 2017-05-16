const fetch = require('./lib/fetch')
require('dotenv').config()

switch(process.argv[2]) {
  case 'summary':
    fetch.summary()
    break

  case 'fines':
    fetch.fines()
    break

  case 'loans':
    fetch.loans()
    break

  default:
    console.log('Please enter a valid option')
    console.log('Options are: summary, fines or loans')
    console.log('Run your choice after the program like so:')
    console.log('node app summary')
    break
}