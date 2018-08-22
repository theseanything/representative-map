<template>
  <div class="map">
    <gmap-autocomplete 
      class="uk-input" 
      id="autocomplete" 
      @place_changed="setPlace" 
      placeholder="Enter a location"
      aria-label="Search for a location">
    </gmap-autocomplete>
    <div id="toggle-location"  class="uk-button-group">
      <button 
        @click="toggleNyc"
        class="uk-button uk-button-default toggle-location-button">
        NYC
      </button>
      <button 
        @click="toggleNys"
        class="uk-button uk-button-default toggle-location-button">
        NYS
      </button>
    </div>
    <gmap-map id="map" ref="mapRef" :center="center" :zoom="7" 
      :options="{
        mapTypeControl: false, 
        streetViewControl: false,
        fullscreenControl: false
      }">
      <gmap-marker 
        v-if="this.place" 
        label="★" 
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }"
      />
      <gmap-polygon 
        v-for="d in districts" 
        :ref="'polygon' + d.number" 
        :key="d.number" 
        :paths="d.coordinates" 
        :options="d.options" 
        @click="changeDistrict(d.number)">
      </gmap-polygon>
    </gmap-map>
  </div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'Map',
  computed: {
    ...mapState(['districts']),
    ...mapGetters(['polygonOptions', 'districtNumber', 'districtColor']),
    google: gmapApi
  },
  data () {
    return {
      center: { lat: 42.7466321, lng: -75.770041 },
      place: null,
      toggledNyc: false,
      nycBounds: { south: 40.4773991, west: -74.25908989999999, north: 40.9175771, east: -73.70027209999999 },
      nysBounds: { south: 40.4773991, west: -79.7625901, north: 45.015865, east: -71.777491 }
    }
  },
  methods: {
    ...mapMutations(['selectDistrict', 'highlightDistrict', 'unhighlightDistrict']),
    changeDistrict (d) {
      if (d == this.districtNumber) {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'district', params: { districtNumber: d } })
      }
    },
    setPlace (place) {
      this.place = place
      var point = new this.google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng())
      for (var key in this.$refs) {
        if (key.startsWith('polygon')) {
          var polygon = this.$refs[key][0].$polygonObject
          if (this.google.maps.geometry.poly.containsLocation(point, polygon)) {
            var districtNumber = key.substring(7)
            this.changeDistrict(districtNumber)
            return
          }
        }
      }
    },
    toggleNys () {
      this.$refs.mapRef.$mapPromise.then(map => map.fitBounds(this.nysBounds))
    },
    toggleNyc () {
      this.$refs.mapRef.$mapPromise.then(map => map.fitBounds(this.nycBounds))
    }
  },
  watch: {
    districtNumber: function (newDistrictNumber, oldDistrictNumber) {
      if (oldDistrictNumber) {
        this.unhighlightDistrict(oldDistrictNumber)
      }
      if (newDistrictNumber) {
        this.highlightDistrict(newDistrictNumber)
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#autocomplete {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
  width: 350px;
}

#toggle-location {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 10;
  background: #fff;
}

#toggle-location:hover {
  background: #fff;
}

.toggle-location-button {
  padding-left: 20px;
  padding-right: 20px;
}

#map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.map {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0;
}
</style>
