import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDistrict: null,
    parties: {},
    senators: null,
    districts: [],
    candidates: {}
  },
  getters: {
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
    people: state => {
      var people = []
      if (state.selectedDistrict) {
        var includesSenator = state.selectedDistrict.candidates.includes(
          state.selectedDistrict.senator
        )
        if (!includesSenator) {
          people.push(state.senators[state.selectedDistrict.senator])
        }
        people = state.selectedDistrict.candidates.map(c => {
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
    },
    getBoundaryColor: state => parties => {
      if (parties.includes('D')) {
        return state.parties['Democratic'].color
      } else if (parties.includes('R')) {
        return state.parties['Republican'].color
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
    async loadDistricts({ commit, state, getters, dispatch }) {
      await dispatch('loadSenators')
      await dispatch('loadCandidates')
      import('../assets/districts.json').then(data => {
        var districts = data.default
        for (var number in districts) {
          var color = getters.getBoundaryColor(
            state.senators[districts[number].senator].parties
          )
          districts[number].options = {
            geodesic: true,
            strokeColor: color,
            fillColor: color,
            strokeWeight: 1,
            fillOpacity: 0.1,
            strokeOpacity: 0.2
          }
        }

        commit('setDistricts', districts)
      })
    }
  }
})
