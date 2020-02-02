<template>
  <div class="parent">
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1 {
  font-size: 1.4rem;
  font-weight: normal;
}

h2 {
  font-size: 1.2rem;
  font-weight: normal;
}

h2 + p,
h1 + p {
  margin-top: 10px;
}

.button--pink {
  background-color: #e91e63;
  color: #fff;
  border: 1px solid #e91e63;
  border-radius: 3px;
  padding: 10px;
  height: 40px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-block;
  text-decoration: none;
}

.button--pink:hover {
  color: #fff;
  background-color: #a70a3e;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.parent {
  display: flex;
  height: 100vh;
}

.container {
  max-width: 600px;
  width: 100%;
  background: #fff;
  margin: auto;
  padding: 25px;
  border-radius: 5px;
}
</style>
