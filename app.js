const fetch = require('./lib/fetch')
require('dotenv').config()

switch(process.argv[2]) {
  case 'summary':
    fetch.summary()
    break

  case 'fines':
    fetch.fines()
    break

  default:
    console.log('Please enter a valid option')
    break
}