<template>
  <div class="hello">
    <el-container>
      <el-aside>
        <h2>NYS Senate Map</h2>
          <GmapAutocomplete @place_changed="setPlace">
          </GmapAutocomplete>
        <div v-if="selectedDistrict">
          <h3>District {{ selectedDistrict.number }}</h3>
          <img :src="selectedDistrict.senator.headshot" alt="" width="160" height="160">
          <h3>{{ selectedDistrict.senator.name }}</h3>
          <div id="parties">
            <el-tag type="info" size="small" v-for="p in selectedDistrict.senator.parties" :key="p">{{ getPartyFullname(p) }}</el-tag>
          </div>
        </div>
        <div v-if="!selectedDistrict">
          <h3>No District Selected</h3>
        </div>

      </el-aside>
      <el-main id="main">
        <gmap-map id="map" ref="mapRef" :center="center" :zoom="7" :options="{mapTypeControl: false, streetViewControl: false}">
          <GmapMarker 
            v-if="this.place" 
            label="★" 
            :position="{lat: this.place.geometry.location.lat(),lng: this.place.geometry.location.lng()}"
          />

          <gmap-polygon v-for="d in senateDistricts" :ref="'polygon' + d.number" :key="d.number" :paths="d.coordinates" :options="d.options" @click="selectDistrict(d)">
          </gmap-polygon>
        </gmap-map>
      </el-main>
    </el-container>
  </div>

</template>

<script>
// import sentateInfo from '../assets/senateDistricts.json'
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'HelloWorld',
  computed: {
    google: gmapApi
  },
  data () {
    return {
      center: { lat: 42.7466321, lng: -75.770041 },
      place: null,
      senateDistricts: [],
      selectedDistrict: null,
      senators: {},
      partyInfo: {}
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
            this.selectDistrict(this.senateDistricts.find(d => { return d.number == districtNumber }))
            return
          }
        }
      }

      // var point = new this.google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng())
      // this.google.maps.geometry.poly.containsLocation(point, polygon)
    },
    getPartyFullname (p) {
      var party = this.partyInfo[p]
      return (party) ? party.name : p
    },
    highlightDistrict (d) {
      d.options.strokeWeight = 3
      d.options.fillOpacity = 0.3
    },
    unhighlightDistrict (d) {
      d.options.strokeWeight = 1
      d.options.fillOpacity = 0.1
    },
    selectDistrict (d) {
      if (this.selectedDistrict) {
        this.unhighlightDistrict(this.selectedDistrict)
      }
      this.selectedDistrict = (this.selectedDistrict == d) ? null : d
      if (this.selectedDistrict) {
        this.highlightDistrict(this.selectedDistrict)
      }
    },
    getBoundaryColor (parties) {
      if (parties.includes('D')) {
        return this.partyInfo['D'].color
      } else if (parties.includes('R')) {
        return this.partyInfo['R'].color
      }
      return '#000000'
    },
    loadSenateDistricts (data) {
      data.districts.forEach(d => {

        var senator = this.senators.senators.find(s => {
          return s.district === d.number
        })

        var color = this.getBoundaryColor(senator.parties)

        this.senateDistricts.push({
          number: d.number,
          coordinates: d.coordinates,
          options: { geodesic: true, strokeColor: color, fillColor: color, strokeWeight: 1, fillOpacity: 0.1, strokeOpacity: 0.2 },
          senator: senator
        })
      })
    }

  },
  created () {
    import('../assets/partyInformation.json').then(data => this.partyInfo = data)
    import('../assets/senators.json').then(data => this.senators = data)
    import('../assets/senateDistricts.json').then(data => this.loadSenateDistricts(data))
    // const url = '/senateDistricts.json'
    // fetch(url).then(response => response.json()).then(data => this.loadSenateDistricts(data))
  },
  // mounted () {
  //   this.$refs.mapRef.$mapPromise.then((map) => {
  //     var bounds = new this.google.maps.LatLngBounds({ lat: 40.4773991, lng: -79.7625901 }, { lat: 45.015865, lng: -71.777491 })
  //     map.fitBounds(bounds)
  //     map.panToBounds(bounds)
  //   })
  // }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  padding: 0;
  height: 100vh;
  width: 100%;
}

#map {
  height: 100%;
  width: 100%;
}

.hello {
  height: 100%;
  width: 100%;
}
</style>
