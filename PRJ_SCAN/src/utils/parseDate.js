export function parseDate(date) {
  const dateObj = new Date(date)

  const day = (+dateObj.getDate()) < 10
    ? `0${+dateObj.getDate()}`
    : +dateObj.getDate()

  const month = (+dateObj.getMonth() + 1) < 10
    ? `0${+dateObj.getMonth() + 1}`
    : +dateObj.getMonth() + 1

  const year = dateObj.getFullYear()

  return `${day}.${month}.${year}`
}