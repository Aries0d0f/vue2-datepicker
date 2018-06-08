<template>
  <div class="datepicker-wrapper">
    <div class="datepicker-dummy-wrapper" @click="isOpen = true">
      <div v-if="!singleDateSelection">
        <font-awesome-icon icon="calendar-alt" />
        <input type="text" :value="formatDate(startingDateValue, format)" :placeholder="i18n['start-date']" readonly>
      </div>
      <div v-if="!singleDateSelection">
        <font-awesome-icon icon="angle-right" />
        <input type="text" :value="formatDate(endingDateValue, format)" :placeholder="i18n['end-date']" readonly>
        <font-awesome-icon icon="times" @click="clearAll()" />
      </div>
      <div v-if="singleDateSelection">
        <font-awesome-icon icon="calendar-alt" />
        <input type="text" :value="formatDate(startingDateValue, format)" :placeholder="i18n['choose-date']" readonly>
        <font-awesome-icon icon="times" @click="clearAll()" />
      </div>
    </div>
    <div class="datepicker-main-wrapper" v-click-outside="() => {isOpen = false}" v-if="isOpen">
      <div class="datepicker-inner">
        <div class="datepicker-header">
          <div class="left" @click="getCalendarMonth(--calendarDisplace)"><font-awesome-icon icon="angle-left" /></div>
          <div class="right" @click="getCalendarMonth(++calendarDisplace)"><font-awesome-icon icon="angle-right" /></div>
        </div>
        <div class="datepicker-container" v-for="(cal, index) in calendars" :key="index">
          <div class="datepicker-month-name">
            <h1>{{ i18n['month-names'][cal.month] }}</h1>
            <p>{{ new Date(cal.daysArray[0]).getFullYear() }}</p>
          </div>
          <div class="datepicker-weekbar">
            <span v-for="name in i18n['day-names']" :key="name">{{ name }}</span>
          </div>
          <div class="datepicker-table">
            <p v-for="n in cal.startWeekIndex" :key="n"></p>
            <p class="datepicker-day" v-for="(day, i) in cal.daysArray" :key="i + cal.startWeekIndex + 1" @mouseover="hoveringDate = day" @click="isAvailDay(day) ? setDay(day) : null" :class="{'active': isSelecedDay(day), 'available': isAvailDay(day)}">{{ new Date(day).getDate() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon  from '@fortawesome/vue-fontawesome'
import fontawesome      from '@fortawesome/fontawesome'
import solid            from '@fortawesome/fontawesome-free-solid'
import vClickOutside    from 'v-click-outside'
import Vue              from 'vue'

import util             from '../util'

// Add fontawesome icon
fontawesome.library.add(solid)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)

// Add outside click directive
Vue.use(vClickOutside)

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
    value: {
      type: Object
    },
    startDateValue: {
      default: null,
      type: Date
    },
    endDateValue: {
      default: null,
      type: Date
    },
    format: {
      default: 'YYYY-MM-DD',
      type: String
    },
    singleDateSelection: {
      default: false,
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
      calendars: [],
      startingDateValue: this.startDateValue,
      endingDateValue: this.endDateValue,
      calendarDisplace: 0
    }
  },
  methods: {
    ...util,
    setDay (day) {
      if (this.singleDateSelection) {
        this.startingDateValue = day
        this.isOpen = false
      } else if (this.startingDateValue && !this.endingDateValue) {
        this.endingDateValue = day
        this.isOpen = false
      } else if (this.endingDateValue) {
        this.startingDateValue = day
        this.endingDateValue = null
      } else {
        this.startingDateValue = day
      }
    },
    isSelecedDay (day) {
      if (this.singleDateSelection) {
        return new Date(this.startingDateValue).getTime() === new Date(day).getTime()
      } else if (this.startingDateValue) {
        return new Date(this.startingDateValue).getTime() <= new Date(day).getTime() && new Date(day).getTime() <= (new Date(this.endingDateValue).getTime() || new Date(this.hoveringDate).getTime())
      }
    },
    isAvailDay (day) {
      return new Date(this.startDate).getTime() <= new Date(day).getTime() && new Date(day).getTime() < (new Date(this.endDate).getTime() || this.endDate)
    },
    getCalendarMonth (d) {
      this.calendars = []
      let startDate = this.startingDateValue ? this.startingDateValue : this.startDate
      if (this.singleDateSelection) {
        this.calendars.push(this.getCalendar(new Date(startDate.getFullYear(), startDate.getMonth() + d, 1)))
      } else {
        this.calendars.push(this.getCalendar(new Date(startDate.getFullYear(), startDate.getMonth() + d, 1)))
        this.calendars.push(this.getCalendar(new Date(startDate.getFullYear(), startDate.getMonth() + d + 1, 1)))
      }
    },
    clearAll () {
      this.startingDateValue = this.endingDateValue = null
    }
  },
  watch: {
    isOpen: function () {
      this.calendarDisplace = 0
      this.getCalendarMonth(0)
    },
    startingDateValue (value) {
      this.$emit('input', { start: this.startingDateValue, end: this.endingDateValue })
    },
    endingDateValue (value) {
      this.$emit('input', { start: this.startingDateValue, end: this.endingDateValue })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';
@import '../assets/datepicker.scss';
</style>
