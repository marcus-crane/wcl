const parse5 = require('parse5')
const fs = require('fs')
const { JSDOM } = require('jsdom')

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

exports.getLoans = (data) => {
  const document = parse5.parse(data)

  try {
    const script = document.childNodes[8].childNodes[2].childNodes[1].childNodes[11].childNodes[1].childNodes[4].childNodes[1].childNodes[3].childNodes[0].value.trim()
    return cleanseObject(script, 'loans')
  } catch (e) {
    return false
  }
}


exports.getFines = (data) => {
  const document = parse5.parse(data)

  try {
    const script = document.childNodes[8].childNodes[2].childNodes[0].childNodes[3].childNodes[3].childNodes[1].childNodes[4].childNodes[1].childNodes[5].childNodes[0].value.trim()  
    return cleanseObject(script, 'fines')
  } catch(e) {
    return false
  }
}

cleanseObject = (object, page) => {
  const strippedObject = object.match(/\s\[([^]+)\s]/gm)[0].replace(/^\s+|\s+$/g, '')

  const dom = new JSDOM(`<body>
    <script>var FINES = ${strippedObject}; document.body.innerHTML = JSON.stringify(FINES);</script>
    </body>`, { runScripts: "dangerously" 
  })

  let stringDOM = dom.serialize().match(/\[(.[^]+)\]/g)[0]

  if (page === 'fines') {
    const balance = stringDOM.match(/<b>(.*)<\/b><input type="hidden" name="fineamount" id="fineamount_0" value="(.*)">/)[1]
    stringDOM = stringDOM.replace(/<b>(.*)<\/b><input type="hidden" name="fineamount" id="fineamount_0" value="(.*)">/, balance)
  }
  
  return JSON.parse(stringDOM)
}