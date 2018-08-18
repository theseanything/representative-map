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
        <div class="uk-section uk-section-xsmall">
            <div class="uk-container" v-if="selectedDistrict">
                <h2>District {{ selectedDistrict.number }}</h2>
                <hr>

                <div class="uk-flex uk-flex-column">
                    <div v-if="people.length > 0">
                        <Candidate v-for='p in people' :key="p.name" :info="p"/>
                    </div>
                    <div class="uk-text-top" v-else >
                        <span class="uk-margin-small-right uk-icon" uk-icon="warning"></span>No data
                    </div>
                </div>
            </div>
        </div>
        <div class="uk-container" v-if="!selectedDistrict">
            Select a district <span class="uk-icon" uk-icon="arrow-right"></span>
        </div>
    </div>
</template>
<script>
import Candidate from './Candidate.vue'
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'Sidebar',
    components: {
        Candidate
    },
    computed: {
        ...mapState(['selectedDistrict']),
        ...mapGetters(['getPartyFullname', 'people'])
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

ul.parties > li {
  display: inline-block;
  margin: 0 10px;
  /* You can also add some margins here to make it look prettier */
}
</style>
