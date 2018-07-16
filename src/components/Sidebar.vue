<template>
  <div class="sidebar">
        <h2>New York Representatives</h2>

        <el-menu class="map-menu" :default-active="activeIndex" mode="horizontal">
          <el-menu-item class="map-menu-item" index="1">State Senate</el-menu-item>
        </el-menu>

          <!-- <el-button icon="el-icon-search" circle></el-button> -->
        <div class="district-info" v-if="selectedDistrict">
          <div>
            <h3>District {{ selectedDistrict.number }}</h3>
            <div class="partition"></div>
            <img :src="'/headshots/cropped/'  + selectedDistrict.senator.district + '.jpg'" alt="" width="160" height="160">
            <h3>{{ selectedDistrict.senator.name }}</h3>
            <div id="parties">
              <el-tag type="info" size="small" v-for="p in selectedDistrict.senator.parties" :key="p">{{ $store.getters.getPartyFullname(p) }}</el-tag>
            </div>
          </div>
        </div>

        <div class="district-info no-selection" v-if="!selectedDistrict">
          <div>
            <p id="no-district-text">No district selected.</p>
          </div>
        </div>
  </div>

</template>
<script>

export default {
  name: 'Sidebar',
  computed: {
    selectedDistrict () {
      return this.$store.state.selectedDistrict
    }
  },
  data () {
    return {
      activeIndex: '1'
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 18px;
}

h2,
h3 {
  font-weight: 300;
  margin: 0;
}

input {
  margin: 20px 0;
}

.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.map-menu {
  display: flex;
}

.map-menu-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

.district-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.partition {
  margin: 10px 0;
  height: 1px;
  background: #e0e0e3;
  width: 100%;
}

.district-info > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.no-selection > div {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#no-district-text {
  color: grey;
}

img {
  border-radius: 50%;
  height: 80px;
  width: 80px;
}
</style>
