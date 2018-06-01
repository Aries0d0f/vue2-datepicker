import fecha from 'fecha'

export default {
  getCalender: (month) => {
    class Calender {
      constructor (month) {
        this.year = new Date(month).getFullYear()
        this.month = new Date(month).getMonth() + 1
        this.daysArray = [...Array(new Date(this.year, this.month, 0).getDate()).keys()].map(e => (new Date(this.year, this.month, e + 1)))
        this.startWeekIndex = new Date(this.year, this.month - 1, 1).getDay()
      }
    }
    return new Calender(month)
  },
  formatDate: (date, format) => {
    return date ? fecha.format(new Date(date), format) : null
  }
}
