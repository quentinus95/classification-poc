<template>
  <main class="container">
    <h1>Classification POC</h1>
    <router-view />
  </main>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.min.css';

  main {
    padding: 20px 0;
  }
</style>
