import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function districtColor(state, district) {
  var parties = state.senators[district.senator].parties
  for (var i = 0; i < parties.length; i++) {
    if (state.parties['Democratic'].acronyms.includes(parties[i])) {
      return state.parties['Democratic'].color
    }

    if (state.parties['Republican'].acronyms.includes(parties[i])) {
      return state.parties['Republican'].color
    }
  }

  return '#000990'
}

export default new Vuex.Store({
  state: {
    parties: {},
    senators: null,
    districts: {},
    candidates: {}
  },
  getters: {
    selectedDistrict: state => {
      return state.districts[state.route.params.districtNumber] || null
    },
    districtNumber: state => {
      return state.route.params.districtNumber
    },
    maxDistricts: state => {
      return Object.keys(state.districts).length
    },
    candidates: state => {
      return state.selectedDistrict
        ? state.selectedDistrict.candidates.map(c => state.candidates[c])
        : []
    },
    senator: state => {
      return state.selectedDistrict
        ? state.senators[state.selectedDistrict.senator]
        : null
    },
    people: (state, getters) => {
      var people = []
      if (getters.selectedDistrict) {
        var includesSenator = getters.selectedDistrict.candidates.includes(
          getters.selectedDistrict.senator
        )
        if (!includesSenator) {
          people.push(state.senators[getters.selectedDistrict.senator])
        }
        people = getters.selectedDistrict.candidates.map(c => {
          return state.candidates[c]
        })
      }
      return people
    },
    getPartyFullname: state => abbr => {
      for (var p in state.parties) {
        if (state.parties[p].acronyms.find(a => a === abbr)) return p
      }
      return abbr
    }
  },
  mutations: {
    setParties(state, data) {
      state.parties = data
    },
    setSenators(state, data) {
      state.senators = data
    },
    setDistricts(state, districts) {
      for (var d in districts) {
        var color = districtColor(state, districts[d])
        districts[d].options = {
          geodesic: true,
          strokeColor: color,
          fillColor: color,
          strokeWeight: 1,
          fillOpacity: 0.1,
          strokeOpacity: 0.2
        }
      }
      var districtNumber = state.route.params.districtNumber
      if (districtNumber) {
        districts[districtNumber].options.strokeWeight = 3
        districts[districtNumber].options.fillOpacity = 0.3
      }
      state.districts = districts
    },
    setCandidates(state, candidates) {
      state.candidates = candidates
    },
    highlightDistrict(state, districtNumber) {
      state.districts[districtNumber].options.strokeWeight = 3
      state.districts[districtNumber].options.fillOpacity = 0.3
    },
    unhighlightDistrict(state, districtNumber) {
      state.districts[districtNumber].options.strokeWeight = 1
      state.districts[districtNumber].options.fillOpacity = 0.1
    }
  },
  actions: {
    loadParties({ commit }) {
      import('../assets/parties.json').then(data =>
        commit('setParties', data.default)
      )
    },
    loadSenators({ commit }) {
      import('../assets/senators.json').then(data =>
        commit('setSenators', data.default)
      )
    },
    loadCandidates({ commit }) {
      import('../assets/candidates.json').then(data =>
        commit('setCandidates', data.default)
      )
    },
    loadDistricts({ commit }) {
      import('../assets/districts.json').then(data => {
        commit('setDistricts', data.default)
      })
    },
    async fetchData({ dispatch }) {
      await Promise.all([
        dispatch('loadParties'),
        dispatch('loadSenators'),
        dispatch('loadCandidates')
      ])
      dispatch('loadDistricts')
    }
  }
})
