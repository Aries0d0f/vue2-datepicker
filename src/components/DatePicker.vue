<template>
  <div class="datepicker-wrapper">
    <div class="datepicker-dummy-wrapper" @click="isOpen = true">
      <input v-if="!singleDateSelection" type="text" class="datepicker" :value="formatDate(startDateValue, format)" :placeholder="i18n['start-date']" readonly>
      <input v-if="!singleDateSelection" type="text" class="datepicker" :value="formatDate(endDateValue, format)" :placeholder="i18n['end-date']" readonly>
      <input v-if="singleDateSelection" type="text" class="datepicker" :value="formatDate(startDateValue, format)" :placeholder="i18n['choose-date']" readonly>
    </div>
    <div class="datepicker-main-wrapper" v-click-outside="() => {isOpen = false}" v-if="isOpen">
      <div class="datepicker-inner">
        <div class="datepicker-header">
          <div class="left" @click="getCalenderMonth(--calenderDisplace)"><font-awesome-icon icon="angle-left" /></div>
          <div class="right" @click="getCalenderMonth(++calenderDisplace)"><font-awesome-icon icon="angle-right" /></div>
        </div>
        <div class="datepicker-container" v-for="(cal, index) in calenders" :key="index">
          <h1 class="datepicker-month-name">{{ i18n['month-names'][cal.month] }}</h1>
          <div class="datepicker-weekbar">
            <span v-for="name in i18n['day-names']" :key="name">{{ name }}</span>
          </div>
          <div class="datepicker-table">
            <p v-for="n in cal.startWeekIndex" :key="n"></p>
            <p class="datepicker-day" v-for="(day, i) in cal.daysArray" :key="i + cal.startWeekIndex + 1" @mouseover="hoveringDate = day" @click="setDay(day)" :class="{'active': isSelecedDay(day)}">{{ new Date(day).getDate() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../util'
const defaultI18n = {
  night: 'Night',
  nights: 'Nights',
  'day-names': [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  'start-date': 'Start Date',
  'end-date': 'End Date',
  'choose-date': 'Choose Date',
  'month-names': [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
}

export default {
  name: 'DatePicker',
  props: {
    format: {
      default: 'YYYY-MM-DD',
      type: String
    },
    singleDateSelection: {
      default: true,
      type: Boolean
    },
    startDate: {
      default: () => {
        return new Date()
      },
      type: [ Date, String ]
    },
    endDate: {
      default: Infinity,
      type: [ Date, String, Number ]
    },
    disabledDates: {
      default: () => {
        return []
      },
      type: Array
    },
    disableWeekend: {
      default: false,
      type: Boolean
    },
    minDateRange: {
      default: null,
      type: Number
    },
    maxDateRange: {
      default: null,
      type: Number
    },
    firstDayAsMonday: {
      default: false,
      type: Boolean
    },
    i18n: {
      default: () => defaultI18n,
      type: Object
    },
    showYear: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      isOpen: false,
      currentDate: new Date(),
      hoveringDate: null,
      calenders: [],
      startDateValue: null,
      endDateValue: null,
      calenderDisplace: 0
    }
  },
  methods: {
    ...util,
    setDay (day) {
      if (this.singleDateSelection) {
        this.startDateValue = day
        this.isOpen = false
      } else if (this.startDateValue && !this.endDateValue) {
        this.endDateValue = day
        this.isOpen = false
      } else if (this.endDateValue) {
        this.startDateValue = day
        this.endDateValue = null
      } else {
        this.startDateValue = day
      }
    },
    isSelecedDay (day) {
      if (this.singleDateSelection) {
        return new Date(this.startDateValue).getTime() === new Date(day).getTime()
      } else if (this.startDateValue) {
        return new Date(this.startDateValue).getTime() <= new Date(day).getTime() && new Date(day).getTime() <= (new Date(this.endDateValue).getTime() || new Date(this.hoveringDate).getTime())
      }
    },
    getCalenderMonth (d) {
      this.calenders = []
      let startDate = this.startDateValue ? this.startDateValue : this.startDate
      if (this.singleDateSelection) {
        this.calenders.push(this.getCalender(new Date(startDate.getFullYear(), startDate.getMonth() + d, 1)))
      } else {
        this.calenders.push(this.getCalender(new Date(startDate.getFullYear(), startDate.getMonth() + d, 1)))
        this.calenders.push(this.getCalender(new Date(startDate.getFullYear(), startDate.getMonth() + d + 1, 1)))
      }
    }
  },
  watch: {
    isOpen: function () {
      this.calenderDisplace = 0
      this.getCalenderMonth(0)
    }
  }
}
</script>
