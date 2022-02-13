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

# No longer actively maintained.

Please beaware that this module is no longer actively maintained. It will continue to be available, but not for new Nuxt features at this time.

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
    enabled: true,
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

You can also enable or disable the protection using the option `enabled`, this could be a nice way to protect your website depending on the environment is has been deployed too.

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

### Control the redirect

If your website supports i18n routes, you can register a callback to handle the redirect logic.

An example can be seen in the plugins folder in the example Nuxt app in this repository.

To apply the callback, create a new Nuxt plugin with the following code:

```js
export default function({ $passwordProtect, route, app, redirect }) {
  $passwordProtect.registerRedirectCallback(opts => {
    const localePath = app.localePath('password')

    if (route.path === localePath) {
      return
    }

    redirect(localePath, { previousPath: route.fullPath })
  })
}
```

In the case above we are handling a redirect to a localised path to show the password form.

> Please also ensure you handle the path if you have password protection enabled for your entire website.

The form path is used as a fallback if a callback is not registered.

The redirect callback has access to the password protect options, incase you need it, and you should be able to access the context of the application like any normal Nuxt plugin.

# Demo website

You can see an example of the module at this website, https://nuxt-password-protect.netlify.com/

This code can be found in this repository at ./examples/demo.

# License

<a href="./LICENSE">MIT License</a>
