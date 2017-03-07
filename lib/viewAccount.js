const login = require('./login')
const fetchDetails = require('./fetchDetails')

module.exports = function viewAccount() {
    return login(process.env.WCL_CARD_NUMBER, process.env.WCL_LAST_NAME)
    .then((session) => {
        return fetchDetails(session)
    })
}