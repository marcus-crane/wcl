const chai = require('chai')
const expect = chai.expect
const env = require('dotenv').config('../.env')
const login = require('../src/lib/login')

describe('login', function() {
    it('should return a session cookie', function(done) {
        const cookie = login('process.env.WCL_CARD_NUMBER', 'process.env.WCL_LAST_NAME')

        expect(cookie, '1234')
        done()
    })
})