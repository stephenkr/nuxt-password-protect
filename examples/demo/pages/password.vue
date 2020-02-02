<template>
  <div class="container">
    <h1>Password?</h1>
    <p>Enter in your password, you can do so by filling in the form below.</p>
    <p v-if="!isAuthorised">
      You are not logged in
    </p>
    <a class="button--pink" href="/">Go to password protected area</a>

    <div class="section">
      <h2>Log in using a form</h2>

      <form method="GET" action="/">
        <input value="pass" type="password" name="_pw" placeholder="Your password">
        <button class="button--pink" type="submit">
          Log in
        </button>
      </form>
    </div>
    <div class="section">
      <h2>Log in using a Vue method</h2>

      <p>Using this method will login the user in if the correct password is passed using the nuxt-password-protect authorise method.</p>

      <a class="button--pink" @click="loginUser()">Login using a method</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthorised() {
      return this.$passwordProtect.isAuthorised()
    }
  },

  methods: {
    loginUser() {
      this.$passwordProtect.authorise('pass')
      this.$router.push('/')
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation()
    }
  }
}
</script>

<style scoped>
form {
  margin: 20px 0;
  font-family: sans-serif;
  display: flex;
}
input {
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
  border-radius: 3px;
  height: 40px;
  vertical-align: top;
}

input + button {
  margin-left: 10px;
}

.section {
  padding: 10px 0;
  border-top: 1px solid #ccc;
  margin-top: 10px;
}

p + .button--pink {
  margin-top: 10px;
}
</style>
