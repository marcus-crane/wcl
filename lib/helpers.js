const parse5 = require('parse5')
const fs = require('fs')
const ent = require('ent')

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


exports.getFines = (data) => {
  const document = parse5.parse(data)
  const script = document.childNodes[8].childNodes[2].childNodes[0].childNodes[3].childNodes[3].childNodes[1].childNodes[4].childNodes[1].childNodes[5].childNodes[0].value.trim()  

  let fines = cleanseFinesObject(script)
  console.log(fines)
}

cleanseFinesObject = (object) => {
  let scriptContents = object.match(/{([\s\S]+?)}/gm)[0]
  let decodedObject = ent.decode(scriptContents)
  return decodedObject
}