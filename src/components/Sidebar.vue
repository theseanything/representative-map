<template>
    <div class="sidebar">
        <div class="uk-section uk-section-muted uk-section-xsmall">
            <div class="uk-container">
                <h1 class="uk-h3">New York State Senate</h1>
                <ul class="uk-subnav  uk-subnav-divider uk-margin-small-top" uk-margin>
                    <router-link tag='li' to="/"><a>Districts</a></router-link>
                    <li>
                        <span>Next Election: Sept 13th</span> 
                    </li>
                    <!-- <li v-bind:class="{ 'uk-active': $router.currentRoute.name === 'about' }">
                        <router-link to="/about"><span uk-icon="info"></span></router-link>
                    </li> -->
                </ul>
            </div>
        </div>
        <router-view></router-view>
        <div class="uk-section uk-background-default uk-section-xsmall uk-position-bottom uk-width-large">
            <div class=" uk-container uk-flex uk-margin-remove uk-flex-middle">
                <div class="uk-flex-1">
                    <p class="uk-text-meta text-small uk-margin-remove">Made with ♥︎ by <a href="https://github.com/theseanything">theseanything.</a></p>
                </div>
                <div>
                    <router-link class="uk-text-meta" to="/about">About <span uk-icon="icon: info; ratio: 0.8"></span></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sidebar'
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  height: 100%;
}
.text-small {
  font-size: 0.7rem;
}
</style>
