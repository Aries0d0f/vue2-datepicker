<template>
  <div class="datepicker-wrapper">
    <div class="datepicker-dummy-wrapper" @click="isOpen = true">
      <input v-if="!singleDateSelection" type="text" class="datepicker" :value="formatDate(startDateValue, format)" :placeholder="i18n['start-date']" readonly>
      <input v-if="!singleDateSelection" type="text" class="datepicker" :value="formatDate(endDateValue, format)" :placeholder="i18n['end-date']" readonly>
      <input v-if="singleDateSelection" type="text" class="datepicker" :value="formatDate(startDateValue, format)" :placeholder="i18n['choose-date']" readonly>
    </div>
    <div class="datepicker-main-wrapper" v-click-outside="() => {isOpen = false}" v-if="isOpen">
      <div class="datepicker-inner">
        <div class="datepicker-header"></div>
        <div class="datepicker-container" v-for="(cal, index) in calenders" v-if="index === activeMonthIndex" :key="index">
          <h1 class="datepicker-month-name">{{ i18n['month-names'][cal.month - 1] }}</h1>
          <div class="datepicker-weekbar">
            <span v-for="name in i18n['day-names']" :key="name">{{ name }}</span>
          </div>
          <div class="datepicker-table">
            <p v-for="n in cal.startWeekIndex" :key="n"></p>
            <p class="datepicker-day" v-for="(day, i) in cal.daysArray" :key="i*10" @click="setDay(day)">{{ new Date(day).getDate() }}</p>
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
      activeMonthIndex: 0,
      startDateValue: null,
      endDateValue: null
    }
  },
  methods: {
    ...util,
    setDay (day) {
      if (this.singleDateSelection) {
        this.startDateValue = day
        this.isOpen = false
      } else if (this.startDateValue) {
        this.endDateValue = day
        this.isOpen = false
      } else {
        this.startDateValue = day
      }
    }
  },
  watch: {
    isOpen: function () {
      this.calenders.pop()
      this.calenders.push(this.getCalender(this.startDate))
    }
  }
}
</script>
