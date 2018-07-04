import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Container, Aside, Main, Tag } from 'element-ui'
import VueAnalytics from 'vue-analytics'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Container)
Vue.use(Tag)
Vue.use(Aside)
Vue.use(Main)

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_TRACKING_ID
})

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    libraries: 'places,geometry',
    v: '3.32' // necessary for places input
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
