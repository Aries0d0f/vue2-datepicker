<template>
  <div id="app">
    <h1>Demo</h1>
    <date-picker />
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
