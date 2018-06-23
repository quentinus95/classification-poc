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
      <h5>
        Waiting for labeling <span class="badge badge-dark">{{ unlabelledImages.length }}</span>
      </h5>
      <ul>
        <li v-for="image of unlabelledImages">
          <router-link :to="{ name: 'image', params: { collection: name, image: image.name } }">
            {{ image.name }}
          </router-link>
        </li>
      </ul>
      <h5>
        Labelled <span class="badge badge-dark">{{ labelledImages.length }}</span>
      </h5>
      <ul>
        <li v-for="image of labelledImages">
          <router-link :to="{ name: 'image', params: { collection: name, image: image.name } }">
            {{ image.name }}
          </router-link>
          <span class="badge badge-info" v-if="image.label">
            {{ image.label }}
          </span>
          (labelled by {{ image.label.author.name }}
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
        return this.unlabelledImages.length > 0
      },
      labelledImages () {
        return this.images.filter(image => image.label)
      },
      unlabelledImages () {
        return this.images.filter(image => !image.label)
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
                author {
                  name
                }
              }
            }
          }
        }
      `)

      this.images = response.collection.images
    }
  }
</script>
