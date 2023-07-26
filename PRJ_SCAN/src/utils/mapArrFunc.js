import { parseDate } from './parseDate'

export const mapArrFunc = (arr) => {
  const resArr = []
  if (!arr || !arr.length) {
    return []
  } else {
    if (arr[0].histogramType === "totalDocuments") {
      arr[0].data.forEach(dataItem => {
        resArr.push({
          date: parseDate(dataItem.date),
          totalValue: dataItem.value,
          riskValue: 0
        })
      })
      if (arr[1]) {
        resArr.forEach((resItem, index) => {
          resItem.riskValue = arr[1].data[index].value
        })
      }
    }

    if (arr[0].histogramType === "riskFactors") {
      arr[0].data.forEach(dataItem => {
        resArr.push({
          date: parseDate(dataItem.date),
          totalValue: 0,
          riskValue: dataItem.value
        })
      })
      if (arr[1]) {
        resArr.forEach((resItem, index) => {
          resItem.totalValue = arr[1].data[index].value
        })
      }
    }
    return resArr
  }

}