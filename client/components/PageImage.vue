<template>
  <section>
    <nav>
      <p class="small">
        <router-link :to="{ name: 'collection', params: { collection: collectionName } }">
          &laquo; Back to collection
        </router-link>
      </p>
    </nav>
    <article v-if="image">
      <h3>{{ image.name }}</h3>
      <coordinates-editor
        :collection="collectionName"
        :image="image.name"
      />
      <h5>Labels</h5>
      <p>
        Image label (required):
        <span class="badge badge-info" v-if="image.label">{{ image.label }}</span>
        <span class="badge badge-danger" v-else>Not labelled</span>
      </p>
    </article>
    <p v-else>Image is loading...</p>
  </section>
</template>

<script>
  import api from '../src/api'
  import SvgSelection from './SvgSelection'
  import CoordinatesEditor from "./CoordinatesEditor";

  export default {
    name: 'page-image',
    components: {
      CoordinatesEditor,
      SvgSelection
    },
    data () {
      return {
        image: null,
        collectionName: ''
      }
    },
    beforeMount () {
      this.collectionName = this.$router.currentRoute.params.collection
    },
    async mounted() {
      const imageName = this.$router.currentRoute.params.image

      const response = await api.sendRequest(`
        query {
          image(collection: "${this.collectionName}", image: "${imageName}") {
            name
            label {
              name
            }
          }
        }
      `)

      this.image = response.image
    }
  }
</script>
