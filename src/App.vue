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

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 400;
}

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
  width: 300px;
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
