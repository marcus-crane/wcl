const expect = require('chai').expect
require('dotenv').config({ path: '../.env' })
const { getCookie } = require('../lib/login')

describe('Login functions', function() {
  describe('getCookie()', function() {
    it('should return a string', async function() {
      const cookie = await getCookie(process.env.CARD_NUMBER, process.env.SURNAME)
      expect(cookie).to.be.a('string')
    })
    
    it('should be 31 characters long', async function() {
      const cookie = await getCookie(process.env.CARD_NUMBER, process.env.SURNAME)
      expect(cookie).to.have.lengthOf(31)
    })
  })
})