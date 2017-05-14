const parse5 = require('parse5')

exports.parseSummary = (data) => {
  const document = parse5.parse(data)
  const loans = document.childNodes[5].childNodes[2].childNodes[3].childNodes[1].childNodes[1].childNodes[4].childNodes[3].childNodes[0].value.trim()
  console.log('loans', loans)
}