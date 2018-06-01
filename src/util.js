import fecha from 'fecha'

class Calender {
  constructor (date) {
    this.year = new Date(date).getFullYear()
    this.month = new Date(date).getMonth()
    this.daysArray = [...Array(new Date(this.year, this.month + 1, 0).getDate()).keys()].map(e => (new Date(this.year, this.month, e + 1)))
    this.startWeekIndex = new Date(this.year, this.month, 1).getDay()
  }
}

export default {
  getCalender: (month) => {
    return new Calender(month)
  },
  formatDate: (date, format) => {
    return date ? fecha.format(new Date(date), format) : null
  }
}
