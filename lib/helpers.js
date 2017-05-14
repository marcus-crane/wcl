const parse5 = require('parse5')

parseSummary = (document, index) => {
  let table = document.childNodes[5].childNodes[2].childNodes[3].childNodes[1].childNodes[1]
  return table.childNodes[index].childNodes[3].childNodes[0].value.trim()
}

exports.getSummary = (data) => {
  const document = parse5.parse(data)

  const summary = {
    loans: parseInt(parseSummary(document, 4)),
    overdue: parseInt(parseSummary(document, 6)),
    reserves: parseInt(parseSummary(document, 8)),
    fees: parseInt(parseSummary(document, 10)),
    balance: parseSummary(document, 12),
    status: parseSummary(document, 14)
  }

  return summary
}