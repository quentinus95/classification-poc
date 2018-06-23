<template>
  <div class="selection-editor" :style="`background-image: url(${serverHost}/public/${collection}/${image}.png)`">
    <svg-selection @coordinates="updateCoordinates" />
  </div>
</template>

<script>
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
    },
    components: {
      SvgSelection
    },
    data () {
      return {
        image: null,
        collectionName: ''
      }
    },
    computed: {
      serverHost () {
        return process.env.SERVER_HOST
      }
    },
    methods: {
      async updateCoordinates(e) {
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
