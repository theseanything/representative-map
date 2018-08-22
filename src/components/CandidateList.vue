<template>
    <div class="uk-section uk-section-xsmall">
        <div class="uk-container" v-if="selectedDistrict">
            <div class="uk-flex uk-flex-middle">
            <h2 class="uk-flex-1 uk-margin-remove">District {{ selectedDistrict.number }}</h2>
            <div class="uk-flex">
                <button 
                    @click="prevDistrict" 
                    class="uk-button uk-button-default uk-padding-remove arrow-button"
                    :disabled="parseInt(districtNumber) <= 1">
                    <span uk-icon="icon: chevron-left; ratio: 1.6;"></span>
                </button>
                <button 
                    @click="nextDistrict" 
                    class="uk-button uk-button-default uk-padding-remove arrow-button" 
                    :disabled="parseInt(districtNumber) >= maxDistricts">
                    <span class="" uk-icon="icon: chevron-right; ratio: 1.6;"></span>
                </button>
                <!-- <a @click="prevDistrict" uk-slidenav-previous></a>
                <a @click="nextDistrict" uk-slidenav-next></a> -->
            </div>
            </div>
            
            <hr>

            <div class="uk-flex uk-flex-column">
                <div v-if="districtPeople.length > 0">
                    <Candidate 
                        v-for='p in districtPeople' 
                        :key="p.name" 
                        :info="p" 
                        :incumbent="p.name === selectedDistrict.senator"
                        :district="districtNumber"/>
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
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'CandidateList',
    components: {
        Candidate
    },
    computed: {
        ...mapState(['route']),
        ...mapGetters(['getPartyFullname', 'districtPeople', 'selectedDistrict', 'maxDistricts', 'districtNumber'])
    },
    methods: {
        nextDistrict: function () {
            var number = parseInt(this.districtNumber)
            if (number < this.maxDistricts) {
                this.$router.push({
                    name: 'district',
                    params: { districtNumber: (number + 1).toString() }
                })
            }
        },
        prevDistrict: function () {
            var number = parseInt(this.districtNumber)
            if (number > 1) {
                this.$router.push({
                    name: 'district',
                    params: { districtNumber: (number - 1).toString() }
                })
            }
        }
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

.arrow-button {
  border: none;
  color: #999;
}
</style>
