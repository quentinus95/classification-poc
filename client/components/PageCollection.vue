<template>
  <section>
    <p class="small"><router-link :to="{ name: 'home' }">&laquo; Back to collections list</router-link></p>
    <h2>{{ collection.name }}</h2>
    <ul>
      <li v-for="image of images">
        {{ image.name }}
        <span class="badge badge-info" v-if="image.label">{{ image.label }}</span>
        <span class="badge badge-danger" v-else>not labelled</span>
      </li>
    </ul>
  </section>
</template>

<script>
  import api from '../src/api'

  export default {
    name: 'page-collection',
    data () {
      return {
        name: '',
        images: []
      }
    },
    computed: {
      collection () {
        return this.$store.getters.collection(this.name)
      }
    },
    async mounted() {
      this.name = this.$router.currentRoute.params.name

      const response = await api.sendRequest(`
        query {
          collection(name: "${this.name}") {
            images {
              name
              label {
                name
              }
            }
          }
        }
      `)

      this.images = response.collection.images
    }
  }
</script>
