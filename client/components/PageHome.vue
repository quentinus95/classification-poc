<template>
  <section>
    <h2>Home</h2>
    <p>
      Hi, <strong>{{ currentUser }}</strong>! Choose the collection you want to work on.
    </p>
    <ul>
      <li v-for="collection of collections">
        <router-link :to="{ name: 'collection', params: { collection: collection.name } }">
          {{ collection.name }}
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '../src/api'

  export default {
    name: 'page-home',
    computed: {
      ...mapGetters(['currentUser', 'collections'])
    },
    async mounted () {
      const response = await api.sendRequest(`
        query {
          collections {
            name
          }
        }
      `)

      return this.$store.dispatch('setCollections', response.collections)
    }
  }
</script>
