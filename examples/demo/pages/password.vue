<template>
  <div class="container">
    <h2>{{ $t('welcome') }}</h2>

    <nuxt-link :to="switchLocalePath('en')">
      English
    </nuxt-link>
    <nuxt-link :to="switchLocalePath('fr')">
      Français
    </nuxt-link>

    <div v-if="isAuthorised">
      <h1>Looks like you're already logged in</h1>

      <p>Either logout or go to the password protected area</p>

      <a @click="removeAuthorisation" class="button--pink">Log out</a>
      <a class="button--pink" href="/">Go to password protected area</a>
    </div>
    <div v-else>
      <h1>Log in</h1>
      <p>Enter in your password, you can do so by filling in the form below.</p>
      <p>The password is <strong>pass</strong></p>

      <div class="section">
        <h2>Log in using a form with the query string.</h2>

        <form method="GET" action="/">
          <input type="password" name="_pw" placeholder="Your password for the querystring login approach">
          <button class="button--pink" type="submit">
            Log in
          </button>
        </form>
      </div>
      <div class="section">
        <h2>Log in using a Vue method with v-model.</h2>

        <p>Using this method will login the user in if the correct password is passed using the nuxt-password-protect authorise method.</p>

        <form>
          <input v-model="methodLoginValue" type="password" placeholder="Your password for the method login approach">

          <a @click="loginUser()" class="button--pink">Login using a method</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      methodLoginValue: '',
      isAuthorised: false
    }
  },
  mounted() {
    this.isAuthorised = this.$passwordProtect.isAuthorised()
  },

  methods: {
    loginUser() {
      this.$passwordProtect.authorise(this.methodLoginValue)
      this.isAuthorised = this.$passwordProtect.isAuthorised()
      this.$router.push('/')
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation()
      this.isAuthorised = this.$passwordProtect.isAuthorised()
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
  width: 300px;
}

form + p {
  margin-top: 10px;
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
