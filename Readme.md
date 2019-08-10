<h1 align="center">nuxt-password-protect</h1>
<p align="center">A simple module used to password protect your pages or your entire website.</p>

<p align="center">
  <a href="https://david-dm.org/stephenkr/nuxt-password-protect">
    <img alt="" src="https://david-dm.org/stephenkr/nuxt-password-protect/status.svg?style=flat-square">
  </a>
  <a href="https://standardjs.com">
    <img alt="" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/nuxt-password-protect">
    <img alt="" src="https://img.shields.io/npm/v/nuxt-password-protect/latest.svg?style=flat-square">
  </a>
  <br/>
  <a href="https://www.npmjs.com/package/nuxt-password-protect">
    <img alt="" src="https://img.shields.io/npm/dt/nuxt-password-protect.svg?style=flat-square">
  </a>
  <a href="https://circleci.com/gh/stephenkr/nuxt-password-protect">
    <img alt="" src="https://img.shields.io/circleci/project/github/stephenkr/nuxt-password-protect.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">Release notes</a>
</p>

## Features
- Require a password to access a page
- Require a password to access the entire website
- Supports multiple passwords
- Full control over the password page

## Usage

### 1. Add module to nuxt.config.js along with the password protect options.

Your passwords can be stored as an environment variable or hardcoded in your source files.

#### A single passwords
```
module.exports = {
  modules: ['nuxt-password-protect'],

  passwordProtect: {
    password: 'hello-world'
  }
}
```

#### Multiple passwords
```
module.exports = {
  modules: ['nuxt-password-protect'],

  passwordProtect: {
    passwords: {
      'password1': 'hello1',
      'password2': 'hello2'
    }
  }
}
```

### 2. Page specific password protect

```
export default {
  name: 'MyComponent',
  middleware: 'password-protect'
}
```

# License

<a href="./LICENSE">MIT License</a>