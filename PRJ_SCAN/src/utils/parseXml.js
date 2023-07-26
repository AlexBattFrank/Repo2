export function parseXml(xml) {
  const parser = new DOMParser()
  const html = parser.parseFromString(xml, "text/xml")
  let result = ''
  html.getElementsByTagName("scandoc")[0].childNodes.forEach((node, index) => {
    if (index < 3) {
      if ((node.innerHTML).match(/[а-я ]/gi)) {
        result += (node.innerHTML).match(/[а-я ]/gi).join('')
      }
    }
  })
  return result + '...'
}