<template>
  <div id="app">
    <el-container>
      <el-aside>
        <sidebar></sidebar>
      </el-aside>
      <el-main id="main">
        <main-map/>
      </el-main>
    </el-container>
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
}
#main {
  padding: 0;
  height: 100vh;
  width: 100%;
  position: relative;
}

.el-aside {
  padding: 20px;
}
</style>
