<template>
  <div id="layout">
      <div id="aside" class="uk-width-large">
        <sidebar></sidebar>
      </div>
      <div id="main">
        <main-map/>
      </div>
  </div>
</template>

<script>
import MainMap from './Map.vue'
import Sidebar from './Sidebar.vue'

export default {
  name: 'layout',
  components: {
    MainMap,
    Sidebar
  },
  created () {
    this.$store.dispatch('fetchData')
  },
  watch: {
    // '$route' (to, from) {
    //   if (to.params.districtNumber !== from.params.districtNumber) {
    //     this.$store.commit('selectDistrict', to.params.districtNumber)
    //   }
    // }
  }
}
</script>

<style lang="scss">
#layout {
  height: 100vh;
  flex-direction: row;
  display: flex;
}

#main {
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
}

#aside {
  // width: 400px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
