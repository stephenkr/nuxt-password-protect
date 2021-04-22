<template>
  <div class="container">
    <h1>This is a dynamic page</h1>
    <p>This area is with the password protected</p>

    <a @click="logout()" class="button--pink">Log out</a>
  </div>
</template>

<script>
export default {
  middleware: ['password-protect'],
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
