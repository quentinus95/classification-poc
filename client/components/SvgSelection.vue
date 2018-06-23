<template>
  <svg width="100%" height="300px" @click="addPoint" ref="svg">
    <circle v-for="coordinate of coordinates" r="3" :cx="coordinate.x" :cy="coordinate.y"
            style="fill: rgba(270, 128, 128, 1)">
    </circle>
    <polygon :points="coordinates.map(coordinate => `${coordinate.x},${coordinate.y}`).join(' ')"
             style="fill: rgba(270, 128, 128, 0.5)"
    ></polygon>
  </svg>
</template>

<script>
  export default {
    name: 'svg-selection',
    data () {
      return {
        coordinates: [],
        pointer: null
      }
    },
    methods: {
      addPoint (e) {
        this.pointer.x = e.clientX
        this.pointer.y = e.clientY

        this.coordinates.push(this.pointer.matrixTransform(this.$refs.svg.getScreenCTM().inverse()))
      }
    },
    mounted () {
      const svg = this.$refs.svg

      this.pointer = svg.createSVGPoint()
    }
  }
</script>

<style lang="scss">
  .area {
    background: #000;
  }
</style>
