import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Container, Aside, Main, Tag } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Container)
Vue.use(Tag)
Vue.use(Aside)
Vue.use(Main)

Vue.config.productionTip = false

// Vue.use(MdOption)
// Vue.use(MdSelect)
console.log(process.env.VUE_APP_GMAP_KEY)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    // key: 'AIzaSyANsnW141BsRr4JFQ5EACU5PR3GNxGGqps',
    libraries: 'places,geometry',
    v: '3.32' // necessary for places input
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
