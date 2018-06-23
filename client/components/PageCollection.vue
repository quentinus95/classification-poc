<template>
  <section>
    <p class="small"><router-link :to="{ name: 'home' }">&laquo; Back to collections list</router-link></p>
    <h2>{{ collection.name }}</h2>
  </section>
</template>

<script>
  export default {
    name: 'page-collection',
    computed: {
      collection () {
        return this.$store.getters.collection(this.$router.currentRoute.params.name)
      }
    }
  }
</script>
