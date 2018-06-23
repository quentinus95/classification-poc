<template>
  <svg width="100%" height="300px" @click="addPoint" ref="svg">
    <circle v-for="coordinate of currentCoordinates" r="3" :cx="coordinate.x" :cy="coordinate.y"
            style="fill: rgba(270, 128, 128, 1)">
    </circle>
    <polygon :points="currentCoordinates.map(coordinate => `${coordinate.x},${coordinate.y}`).join(' ')"
             style="fill: rgba(270, 128, 128, 0.5)"
    ></polygon>
  </svg>
</template>

<script>
  export default {
    name: 'svg-selection',
    props: {
      coordinates: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        currentCoordinates: [],
        pointer: null
      }
    },
    methods: {
      addPoint (e) {
        this.pointer.x = e.clientX
        this.pointer.y = e.clientY

        this.currentCoordinates.push(this.pointer.matrixTransform(this.$refs.svg.getScreenCTM().inverse()))

        this.$emit('coordinates', this.currentCoordinates)
      }
    },
    mounted () {
      const svg = this.$refs.svg

      this.currentCoordinates = this.coordinates.slice()
      this.pointer = svg.createSVGPoint()
    }
  }
</script>

<style lang="scss">
  .area {
    background: #000;
  }
</style>
