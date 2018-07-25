<template>
  <div class="map">
    <gmap-autocomplete 
      class="uk-input" 
      id="autocomplete" 
      @place_changed="setPlace" 
      placeholder="Enter a location"
      aria-label="Search for a location">
    </gmap-autocomplete>
    <gmap-map id="map" ref="mapRef" :center="center" :zoom="7" :options="{mapTypeControl: false, streetViewControl: false}">
      <gmap-marker 
        v-if="this.place" 
        label="★" 
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }"
      />
      <gmap-polygon 
        v-for="d in senateDistricts" 
        :ref="'polygon' + d.number" 
        :key="d.number" 
        :paths="d.coordinates" 
        :options="d.options" 
        @click="$store.commit('setDistrict', d)">
      </gmap-polygon>
    </gmap-map>
  </div>

</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'Map',
  computed: {
    google: gmapApi,
    selectedDistrict () {
      return this.$store.state.selectedDistrict
    },
    senateDistricts () {
      return this.$store.state.districts
    }
  },
  data () {
    return {
      center: { lat: 42.7466321, lng: -75.770041 },
      place: null
    }
  },
  methods: {
    setPlace (place) {
      this.place = place
      var point = new this.google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng())
      for (var key in this.$refs) {
        if (key.startsWith('polygon')) {
          var polygon = this.$refs[key][0].$polygonObject
          if (this.google.maps.geometry.poly.containsLocation(point, polygon)) {
            var districtNumber = key.substring(7)
            this.$store.commit('setDistrict', this.senateDistricts.find(d => { return d.number == districtNumber }))
            return
          }
        }
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
