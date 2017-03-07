const chai = require('chai')
const expect = chai.expect
const env = require('dotenv').config()
const login = require('../lib/login')
const fetchSummary = require('../lib/fetchSummary')

describe('login functions', function() {
    it('should return a valid session for a real account', function() {
        this.timeout(5000)
        return login(process.env.WCL_CARD_NUMBER, process.env.WCL_LAST_NAME)
        .then((userSession) => {
            return fetchSummary(userSession)
        })
        .then((account) => {
            expect(account).to.be.an('object')
            expect(account.fees).to.contain('$')
        })
        .catch((err) => {
            console.error(err)
        })
    })

    it('should fail to return details when provided with a bad login', function() {
        this.timeout(5000)
        return login('c12345678', 'lastname', function() {
            return fetchSummary(userSession)
        })
        .then((account) => {
            expect(account).to.not.be.an('object')
            expect(account).to.have.lengthOf(42)
        })
        .catch((err) => {
            console.error(err)
        })
    })

    it('should fail to return details when provided with a bad session', function() {
        this.timeout(5000)
        return login(process.env.WCL_CARD_NUMBER, process.env.WCL_LAST_NAME)
        .then((userSession) => {
            return fetchSummary('notarealcookie')
        })
        .then((account) => {
            expect(account).to.be.empty
        })
        .catch((err) => {
            console.error(err)
        })
    })
})