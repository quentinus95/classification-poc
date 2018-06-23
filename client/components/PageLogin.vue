<template>
  <section>
    <h2>Log In</h2>
    <p>Please fill in the following form with your username to be identified.</p>

    <form @submit.prevent="identify">
      <input type="text" v-model="username" />
    </form>
  </section>
</template>

<script>
  export default {
    name: 'page-login',
    data () {
      return {
        username: ''
      }
    },
    methods: {
      async identify () {
        await this.$store.dispatch('logIn', this.username)

        this.$router.push({ name: 'home' })
      }
    }
  }
</script>
