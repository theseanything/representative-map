import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parties: {},
    senators: null,
    districts: [],
    candidates: {}
  },
  getters: {
    selectedDistrict: state => {
      return state.districts[state.route.params.districtNumber] || null
    },
    polygonOptions: (state, getters) => number => {
      var selected = state.route.params.districtNumber === number
      var color = getters.districtColor(number)
      return {
        geodesic: true,
        strokeColor: color,
        fillColor: color,
        strokeWeight: selected ? 3 : 1,
        fillOpacity: selected ? 0.3 : 0.1,
        strokeOpacity: 0.2
      }
    },
    districtColor: state => number => {
      var parties = state.senators[state.districts[number].senator].parties
      for (var i = 0; i < parties.length; i++) {
        if (state.parties['Democratic'].acronyms.includes(parties[i])) {
          return state.parties['Democratic'].color
        }

        if (state.parties['Republican'].acronyms.includes(parties[i])) {
          return state.parties['Republican'].color
        }
      }

      return '#000990'
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
      state.districts = districts
    },
    setCandidates(state, candidates) {
      state.candidates = candidates
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
    fetchData({ dispatch }) {
      dispatch('loadParties')
      dispatch('loadSenators')
      dispatch('loadCandidates')
      dispatch('loadDistricts')
    }
  }
})
