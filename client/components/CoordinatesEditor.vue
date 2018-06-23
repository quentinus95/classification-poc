<template>
  <div class="selection-editor" :style="`background-image: url(${serverHost}/public/${collection}/${image}.png)`" style="height: 300px">
    <svg-selection @coordinates="updateCoordinates" v-for="(coordinate, key) of coordinates" :coordinates="JSON.parse(coordinate)" :key="key" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '../src/api'
  import SvgSelection from './SvgSelection'

  export default {
    name: 'coordinates-editor',
    props: {
      collection: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      coordinates: {
        type: Array,
        required: true
      }
    },
    components: {
      SvgSelection
    },
    computed: {
      ...mapGetters(['currentUser']),
      serverHost () {
        return process.env.SERVER_HOST
      }
    },
    methods: {
      async updateCoordinates(e) {
        const coordinates = JSON.stringify(e.map(coordinates => ({ x: coordinates.x, y: coordinates.y})))

        return api.sendRequest(`
          mutation {
            saveImageAnnotation(collection: "${this.collection}", image: "${this.image}", author: "${this.currentUser}", label: "Annotation name", type: "POLYGON", coordinates:"${coordinates.replace(/"/g, "\\\"")}") {
              name
              images {
                name
                annotations {
                  name
                }
              }
            }
          }
        `)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .selection-editor {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
