<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
// 1. Your custom variables and variable overwrites.
$global-link-color: #da7d02;
$base-body-font-weight: 300;
$base-heading-font-weight: 300;
// 2. Import default variables and available mixins.
@import '~uikit/src/scss/variables-theme.scss';
@import '~uikit/src/scss/mixins-theme.scss';
// 3. Your custom mixin overwrites.
@mixin hook-card() {
  color: #000;
}
// 4. Import UIkit.
@import '~uikit/src/scss/uikit-theme.scss';

#app {
  height: 100%;
  width: 100%;
}
</style>
