<template>
  <div class="datepicker-wrapper">
    <div class="datepicker-dummy-wrapper" @click="isOpen = !isOpen">
      <input type="text" class="datepicker" :placeholder="i18n['start-date']" readonly>
      <input type="text" class="datepicker" :placeholder="i18n['end-date']" readonly>
    </div>
    <div class="datepicker-main-wrapper" v-show="isOpen">
      <div class="datepicker-inner">
        <div class="datepicker-header"></div>
        <div class="datepicker-months" v-for="n in [ 0, 1 ]" :key="n">
          <h1 class="datepicker-month-name"></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultI18n = {
  night: 'Night',
  nights: 'Nights',
  'day-names': [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat' ],
  'start-date': 'Start Date',
  'end-date': 'End Date',
  'month-names': [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
}

export default {
  name: 'DatePicker',
  props: {
    formate: {
      default: 'YYYY-MM-DD',
      type: String
    },
    singleDateSelection: {
      default: true,
      type: Boolean
    },
    startDateValue: {
      default: null,
      type: Date
    },
    endDateValue: {
      default: null,
      type: Date
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
    }
  },
  data () {
    return {
      isOpen: false,
      currentDate: new Date(),
      hoveringDate: null,
      startDateValue: this.startDateValue,
      endDateValue: this.endDateValue
    }
  }
}
</script>
