const chai = require('chai')
const expect = chai.expect
const env = require('dotenv').config({ path: '../.env' })
const login = require('../lib/login')
const getCookie = require('../lib/getCookie')

describe('login process', function() {
    describe('getCookie', function() {
        it('should return a new session', function() {
            getCookie()
            .then((newSession) => {
                expect(newSession).to.be.a('string')
                expect(newSession).to.have.lengthOf(32)
            })
        })
    })

    describe('login', function() {
        it('should return a logged in session', function() {
            login(process.env.WCL_CARD_NUMBER, process.env.WCL_LAST_NAME)
            .then((loggedInSession) => {
                expect(loggedInSession).to.be.a('string')
                expect(loggedInSession).to.have.lengthOf(32)
            })
        })
    })
})