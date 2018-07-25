<template>
  <div id="app">
      <div id="aside">
        <sidebar></sidebar>
      </div>
      <div id="main">
        <main-map/>
      </div>
  </div>
</template>

<script>
import MainMap from './components/Map.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  components: {
    MainMap,
    Sidebar
  },
  created () {
    this.$store.dispatch('loadPartyInfo')
    this.$store.dispatch('loadSenators')
    this.$store.dispatch('loadDistricts')
  }
}
</script>

<style lang="scss">
// 1. Your custom variables and variable overwrites.
$global-link-color: #da7d02;
$base-body-font-weight: 300;
$base-heading-font-weight: 300;
// 2. Import default variables and available mixins.
@import '~uikit/src/scss/variables-theme.scss';
@import '~uikit/src/scss/mixins-theme.scss';
// 3. Your custom mixin overwrites.
@mixin hook-card() {
  color: #000;
}
// 4. Import UIkit.
@import '~uikit/src/scss/uikit-theme.scss';

#app {
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
  width: 400px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
