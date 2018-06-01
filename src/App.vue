<template>
  <div id="app">
    <div class="container">
      <h1>Demo</h1>
    </div>
    <div class="container">
      <h2>Single date selection</h2>
      <pre></pre>
      <date-picker :singleDateSelection="true" v-model="date" />
    </div>
    <div class="container">
      <h2>Date range selection</h2>
      <pre></pre>
      <date-picker v-model="date" />
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
      date: null
    }
  }
}
</script>

<style lang="scss">
  @import './assets/main.scss';
</style>
