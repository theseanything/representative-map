<template>
    <div class="uk-section uk-section-xsmall">
        <div class="uk-container" v-if="selectedDistrict">
            <h2>District {{ selectedDistrict.number }}</h2>
            <hr>

            <div class="uk-flex uk-flex-column">
                <div v-if="people.length > 0">
                    <Candidate v-for='p in people' :key="p.name" :info="p" :incumbent="p.name === selectedDistrict.senator"/>
                </div>
                <div class="uk-text-top" v-else >
                    <span class="uk-margin-small-right uk-icon" uk-icon="warning"></span>No data
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Candidate from './Candidate.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'CandidateList',
    components: {
        Candidate
    },
    computed: {
        ...mapGetters(['getPartyFullname', 'people', 'selectedDistrict'])
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul.parties > li {
  display: inline-block;
  margin: 0 10px;
  /* You can also add some margins here to make it look prettier */
}
</style>
