import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDistrict: null,
    partyInfo: [],
    senators: null,
    districts: []
  },
  getters: {
    getPartyFullname: state => partyAbv => {
      var party = state.partyInfo[partyAbv]
      return party ? party.name : partyAbv
    },
    getBoundaryColor: state => parties => {
      if (parties.includes('D')) {
        return state.partyInfo['D'].color
      } else if (parties.includes('R')) {
        return state.partyInfo['R'].color
      }
      return '#000000'
    }
  },
  mutations: {
    setDistrict(state, district) {
      if (state.selectedDistrict) {
        state.selectedDistrict.options.strokeWeight = 1
        state.selectedDistrict.options.fillOpacity = 0.1
      }
      state.selectedDistrict =
        state.selectedDistrict == district ? null : district
      if (state.selectedDistrict) {
        state.selectedDistrict.options.strokeWeight = 3
        state.selectedDistrict.options.fillOpacity = 0.3
      }
    },
    setPartyInfo(state, data) {
      state.partyInfo = data
    },
    setSenators(state, data) {
      state.senators = data
    },
    addDistrict(state, district) {
      state.districts.push(district)
    }
  },
  actions: {
    async loadPartyInfo({ commit }) {
      import('../assets/partyInformation.json').then(data =>
        commit('setPartyInfo', data)
      )
    },
    async loadSenators({ commit }) {
      import('../assets/senators.json').then(data =>
        commit('setSenators', data)
      )
    },
    async loadDistricts({ commit, state, getters }) {
      import('../assets/senateDistricts.json').then(data => {
        data.districts.forEach(d => {
          var senator = state.senators.senators.find(s => {
            return s.district === d.number
          })

          var color = getters.getBoundaryColor(senator.parties)

          commit('addDistrict', {
            number: d.number,
            coordinates: d.coordinates,
            options: {
              geodesic: true,
              strokeColor: color,
              fillColor: color,
              strokeWeight: 1,
              fillOpacity: 0.1,
              strokeOpacity: 0.2
            },
            senator: senator
          })
        })
      })
    }
  }
})
