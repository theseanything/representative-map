<template>
  <div class="sidebar">
    <div class="uk-section uk-section-muted uk-section-xsmall">
      <div class="uk-container">
        <h1 class="uk-h3">New York State Senate</h1>
        <!-- <ul uk-tab>
          <li class="uk-active"><a href="">State Senate</a></li>
          <li><a href="">About</a></li>
        </ul> -->
      </div>
    </div>
          <!-- <el-button icon="el-icon-search" circle></el-button> -->
    <div class="uk-section uk-section-xsmall">
      <div class="uk-container" v-if="selectedDistrict">
          <h2>District {{ selectedDistrict.number }}</h2>
          <hr>
          <!-- <h4 class="uk-margin-small-top">Incumbent:</h4> -->
          <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-auto">
                  <img class="uk-border-circle" width="60" height="60" :src="'/headshots/cropped/'  + selectedDistrict.senator.district + '.jpg'">
              </div>
              <div class="uk-width-expand">
                  <h3 class="uk-margin-remove-bottom">{{ selectedDistrict.senator.name }}</h3>
              </div>
              <div class="uk-width-1-1">
                <ul id="parties">
                  <li v-for="p in selectedDistrict.senator.parties" :key="p">{{ $store.getters.getPartyFullname(p) }}</li>
                </ul>
              </div>
          </div>
      </div>

      <div class="uk-container" v-if="!selectedDistrict">
          Select a district <span uk-icon="arrow-right"></span>
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
.sidebar {
  height: 100%;
}
</style>
