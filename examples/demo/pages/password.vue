<template>
  <div>
    <h1>Password?</h1>
    <p v-if="isAuthorised">
      Is logged in, <a @click="removeAuthorisation">Log out</a>
    </p>
    <a v-else @click="verifyUser">Click here</a>
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
    verifyUser() {
      this.$passwordProtect.authorise('password')
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation()
    }
  }
}
</script>
