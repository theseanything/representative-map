import Vue from 'vue'
import store from './store'
import router from './router'

import App from './App.vue'

import * as VueGoogleMaps from 'vue2-google-maps'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
// import VueMatomo from 'vue-matomo'

// Vue.use(VueMatomo, {
//   host: process.env.VUE_APP_MATOMO_HOST,
//   siteId: process.env.VUE_APP_MATOMO_SITE_ID
// })

// loads the Icon plugin
UIkit.use(Icons)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    libraries: 'places,geometry',
    v: '3.32' // necessary for places input
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
