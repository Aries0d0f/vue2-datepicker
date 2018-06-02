import fecha from 'fecha'

class Calendar {
  /** Generate the monthly calendar from given date
  * @param {Date} date Reference date value
  */
  constructor (date) {
    /** @private {Number}       calendar year (west year)               */
    this.year = new Date(date).getFullYear()
    /** @private {Number}       calendar month (start from 0)           */
    this.month = new Date(date).getMonth()
    /** @private {Array<Date>}  every day in this month                 */
    this.daysArray = [...Array(new Date(this.year, this.month + 1, 0).getDate()).keys()].map(e => (new Date(this.year, this.month, e + 1)))
    /** @private {Number}       the day of the first day in this month  */
    this.startWeekIndex = new Date(this.year, this.month, 1).getDay()
  }
}

export default {
  /** @description Get monthly calendar from given date
  * @param    {Date}    month Reference date value
  * @returns  {Object}
  */
  getCalendar: (month) => {
    return new Calendar(month)
  },
  /** @description Format date via given date structure
  * @param    {Date}    date    Reference date value
  * @param    {String}  format  Reference date format
  * @returns  {String}
  */
  formatDate: (date, format) => {
    return date ? fecha.format(new Date(date), format) : null
  }
}
