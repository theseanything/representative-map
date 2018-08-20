<template>
    <div class="sidebar">
        <div class="uk-section uk-section-muted uk-section-xsmall">
            <div class="uk-container">
                <h1 class="uk-h3">New York State Senate</h1>
                <ul class="uk-subnav  uk-subnav-divider uk-margin-small-top" uk-margin>
                    <li v-bind:class="{ 'uk-active': $router.currentRoute.name === 'home' }">
                        <router-link to="/">Candidates</router-link>
                    </li>
                    <li v-bind:class="{ 'uk-active': $router.currentRoute.name === 'elections' }">
                        <a href="">Primaries: Sept 13th</a>
                    </li>
                    <li v-bind:class="{ 'uk-active': $router.currentRoute.name === 'about' }">
                        <router-link to="/about">About</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
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
</style>
