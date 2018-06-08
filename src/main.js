import Vue              from 'vue'
import VueHighlightJS   from 'vue-highlightjs'

import App              from './App'

// Add Hightlight.js
Vue.use(VueHighlightJS)

const app = new Vue({
  ...App
}).$mount('#app')

export default { app }
