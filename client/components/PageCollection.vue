<template>
  <section>
    <nav>
      <p class="small">
        <router-link :to="{ name: 'home' }">&laquo; Back to collections list</router-link>
      </p>
    </nav>
    <article v-if="collection">
      <h2>{{ collection.name }}</h2>
      <p class="alert alert-warning" v-if="missingLabels">
        Some labels are missing!
      </p>
      <ul>
        <li v-for="image of images">
          <router-link :to="{ name: 'image', params: { collection: name, image: image.name } }">
            {{ image.name }}
          </router-link>
          <span class="badge badge-info" v-if="image.label">{{ image.label }}</span>
          <span class="badge badge-danger" v-else>not labelled</span>
        </li>
      </ul>
    </article>
    <p v-else>Collection is loading...</p>
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
      },
      missingLabels () {
        return this.images.findIndex(image => !image.label) !== -1
      }
    },
    async mounted() {
      this.name = this.$router.currentRoute.params.collection

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
