<template>
  <div id="app">
    <div class="container">
      <h1>Demo</h1>
    </div>
    <div class="container">
      <h2>Single date selection</h2>
      <pre></pre>
      <date-picker />
    </div>
    <div class="container">
      <h2>Date range selection</h2>
      <pre></pre>
      <date-picker :singleDateSelection="false" />
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker.vue'

export default {
  name: 'App',
  components: {
    DatePicker
  }
}
</script>

<style lang="scss">
  @import './assets/main.scss';
</style>
