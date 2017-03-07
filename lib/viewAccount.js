const login = require('./login')
const fetchSummary = require('./fetchSummary')
const fetchLoans = require('./fetchLoans')

module.exports = function viewAccount(details) {
    switch(details) {
        case 'summary':
            return login(process.env.WCL_CARD_NUMBER, process.env.WCL_LAST_NAME)
            .then((session) => {
                console.log(session)
                return fetchSummary(session)
            })
            break
        case 'loans':
            return login(process.env.WCL_CARD_NUMBER, process.env.WCL_LAST_NAME)
            .then((session) => {
                return fetchLoans(session)
            })
            break
        default:
            console.log('Sorry, you need to provide a page to fetch')
    }
}