<template>
  <div id="app">
    <div class="container">
      <h1>Demo</h1>
    </div>
    <div class="container">
      <h2>Single date selection</h2>
      <span v-highlightjs="sampleCode[0]"><code class="javascript"></code></span>
      <date-picker :singleDateSelection="true" v-model="date.single" />
    </div>
    <div class="container">
      <h2>Date range selection (default)</h2>
      <span v-highlightjs="sampleCode[1]"><code class="javascript"></code></span>
      <date-picker v-model="date.default" />
    </div>
    <div class="container">
      <h2>Custom format</h2>
      <span v-highlightjs="sampleCode[2]"><code class="javascript"></code></span>
      <date-picker :format="`YYYY/MM/DD`" v-model="date.customFormat" />
    </div>
    <div class="container">
      <h2>Custom start date</h2>
      <span v-highlightjs="sampleCode[3]"><code class="javascript"></code></span>
      <date-picker :startDate="new Date(`2018-07-29`)" v-model="date.customFormat" />
    </div>
    <div class="container">
      <h2>Custom end date</h2>
      <span v-highlightjs="sampleCode[4]"><code class="javascript"></code></span>
      <date-picker :endDate="new Date(`2018-07-29`)" v-model="date.customFormat" />
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker.vue'

export default {
  name: 'App',
  components: {
    DatePicker
  },
  data () {
    return {
      date: {
        single: null,
        default: null,
        customFormat: null
      },
      sampleCode: [
        `<date-picker :singleDateSelection="true" v-model="date" />`,
        `<date-picker v-model="date" />`,
        `<date-picker :format="\`YYYY/MM/DD\`" v-model="date" />`,
        `<date-picker :startDate="new Date(\`2018-07-29\`)" v-model="date" />`,
        `<date-picker :endDate="new Date(\`2018-07-29\`)" v-model="date" />`
      ]
    }
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';
.container {
  margin: 1rem;
  code {
    margin: .5rem 0;
    border-radius: 3pt;
  }
}
</style>
