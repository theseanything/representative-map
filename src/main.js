import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store'
// import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   id: process.env.VUE_APP_TRACKING_ID
// })

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    libraries: 'places,geometry',
    v: '3.32' // necessary for places input
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
