<template>
  <div id="app">
    <h1>Demo</h1>
    <div class="date-picker">
      <h2>Single date selection</h2>
      <pre></pre>
      <date-picker :singleDateSelection="true" />
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
