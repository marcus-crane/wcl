const chai = require('chai')
const expect = chai.expect
const env = require('dotenv').config()
const viewAccount = require('../lib/viewAccount')

describe('WCL functions', function() {
    describe('viewAccount()', function() {
        it('should return an object', function() {
            this.timeout(0)
            return viewAccount()
            .then((account) => {
                expect(account).to.be.an('object')
            })
        })

        it('should contain the correct properties', function() {
            this.timeout(0)
            return viewAccount()
            .then((account) => {
                expect(account).to.have.property('loans')
                expect(account.loans).have.length.of.at.least(1)

                expect(account).to.have.property('overdue')
                expect(account.overdue).have.length.of.at.least(1)

                expect(account).to.have.property('reserves')
                expect(account.reserves).have.length.of.at.least(1)

                expect(account).to.have.property('charges')
                expect(account.charges).have.length.of.at.least(1)

                expect(account).to.have.property('fees')
                expect(account.fees).to.contain('$')

                expect(account).to.have.property('status')
                expect(account.status).to.contain('Good')
            })
        })
    })
})