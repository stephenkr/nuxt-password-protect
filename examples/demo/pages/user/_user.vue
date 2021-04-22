<template>
  <div class="container">
    <h1>This is a dynamic page for user {{ currentUser }}</h1>
    <p>This area is the password protected</p>

    <a @click="logout()" class="button--pink">Log out</a>
  </div>
</template>

<script>
export default {
  middleware: ['password-protect'],
  computed: {
    currentUser() {
      return this.$route.params.user
    }
  },
  methods: {
    logout() {
      this.$passwordProtect.removeAuthorisation()
      this.$nextTick(() => {
        this.$router.push(this.localePath('password'))
      })
    }
  }
}
</script>

<style scoped>
p + .button--pink {
  margin-top: 10px;
}
</style>
