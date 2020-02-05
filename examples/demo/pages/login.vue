<template>
  <div class="container">
    <h1 class="title">
      Enter password
    </h1>

    <form @submit.prevent="submitForm">
      <div>
        <label for="password">Password:</label>
        <br>
        <input id="password" v-model="password" type="password" required>
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  components: {
    // empty
  },
  data() {
    return {
      password: ''
    }
  },
  methods: {
    submitForm() {
      // password protect set a new COOKIE and VAR if password is correct
      // if passowrd is correct, the module also set a bool value as validation
      this.$passwordProtect.authorise(this.password)
      // check password VAR. if all good, redirect to homepage
      if (this.$passwordProtect.isAuthorised()) {
        this.$router.push('/')
      } else {
        alert('wrong password')
      }
    }
  }
}
</script>
