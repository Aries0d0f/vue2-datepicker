import Vue              from 'vue'
import FontAwesomeIcon  from '@fortawesome/vue-fontawesome'
import fontawesome      from '@fortawesome/fontawesome'
import solid            from '@fortawesome/fontawesome-free-solid'

import App              from './App'

// Add fontawesome icon
fontawesome.library.add(solid)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)

const app = new Vue({
  ...App
}).$mount('#app')

export default { app }
