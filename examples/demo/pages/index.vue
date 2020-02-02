<template>
  <div class="container">
    <h1>Welcome</h1>
    <p>This area is the password protected</p>

    <a class="button--pink" @click="logout()">Log out</a>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$passwordProtect.removeAuthorisation()
      this.$router.push('/password')
    }
  }
}
</script>

<style scoped>
p + .button--pink {
  margin-top: 10px;
}
</style>
