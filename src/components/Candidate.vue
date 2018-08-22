<template>
    <div class="uk-comment">
        <header class="uk-comment-header uk-position-relative">
            <div class="uk-grid-medium uk-flex-top" uk-grid>
                <div class="uk-width-auto">
                    <img class="uk-border-circle uk-comment-avatar" width="78" height="78" :data-src="`https://avatars.io/twitter/${info.twitter_screen_name}/medium`" uk-img>
                    <!-- <div class="">Incumbent</div> -->
                </div>
                <div class="uk-width-expand">
                    <h4 class="uk-comment-title uk-margin-remove">{{ info.searchable_name }}</h4>
                    <ul class="uk-comment-meta uk-subnav uk-margin-remove-top ">
                        <li v-for="p in info.parties" :key="p">{{ getPartyFullname(p) }}</li>
                    </ul>
                </div>

            </div>
        </header>
        <div class="uk-comment-meta uk-margin-remove-top links">
            <div class="uk-flex uk-flex-middle">
                <div class="uk-flex-1">
                    <a v-if="info.email" href="" class="uk-icon-button uk-margin-small-right" uk-icon="mail"></a>
                    <a v-if="info.phone" href="" class="uk-icon-button uk-margin-small-right" uk-icon="receiver"></a>
                    <a  v-if="info.website"
                        :href="'http://' + info.website" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="uk-icon-button uk-margin-small-right" 
                        uk-icon="world"></a>
                    <a v-if="info.twitter_screen_name" 
                        :href="'https://twitter.com/' + info.twitter_screen_name"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="uk-icon-button uk-margin-small-right" 
                        uk-icon="twitter">
                    </a>
                </div>
                <div>
                    <div v-if="incumbent" class="uk-label label-plain">Incumbent</div>
                </div>
            </div>

            
        </div>
        <hr/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Candidate',
    props: ['info', 'incumbent'],
    computed: {
        ...mapGetters(['getPartyFullname'])
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label-plain {
  background: inherit;
  color: inherit;
}
/* .links {
  min-height: 36px;
} */
</style>
