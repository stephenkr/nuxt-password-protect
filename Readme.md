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
- Full control over the password page

## Usage

### Add module to nuxt.config.js along with the password protect options.

Your passwords can be stored as an environment variable or hardcoded in your source files.

### Add module to nuxt.config.js

To setup the `nuxt-password-protect`, ensure you add the module in your nuxt.config.js file.

```
module.exports = {
  modules: ['nuxt-password-protect']
}
```

#### Options

Module initialisation in nuxt.config.js
```
module.exports = {
  modules: ['nuxt-password-protect'],

  passwordProtect: {
    formPath: '/password',
    password: 'hello-world',
    tokenSeed: 101010,
    queryString: '_pw',
    cookieName: '_password',
    cookie: {
      prefix: '',
      expires: 5
    },
    ignoredPaths: ['/public-page']
  }
}
```

With the options you can define the basics of your website protection.

### To protect a page, simply add the middleware

```
export default {
  name: 'MyComponent',
  middleware: ['password-protect']
}
```

### To protect an entire website
Add the middle ware to your nuxt configuration file

```
module.exports = {
  router: {
    middleware: ['password-protect']
  }
}
```

To allow specific pages to be accessible without password protection, add the page's full path (`$route.fullPath`) to the `ignoredPaths` option.

### Using the API

We provide three methods you can use on your password form page, these will either add or remove authorisation or check if a user is authorised.

You can access these methods using the context of your vue component.

*this.$passwordProtect.authorise(password)*

This method will create a cookie with a unique cookie if the user has entered the correct password.

*this.$passwordProtect.isAuthorised()*

Is the user authorised to view this content, this will return a boolean depending.

*this.$passwordProtect.removeAuthorisation()*

Removes the users authorisation.

### Using the query string

We also support granting authorisation using a querystring, by default the query string is `_pw`.

So to attempt to authorise you can do `https://mywebsite.com?_pw=password`

The query string can be changed by the protect password options in your nuxt config file.

# Demo website

You can see an example of the module at this website, https://nuxt-password-protect.netlify.com/

This code can be found in this repository at ./examples/demo.

# License

<a href="./LICENSE">MIT License</a>
