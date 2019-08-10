import { Storage } from './password-protect/storage'
import { generateToken } from './password-protect/utils'

import Middleware from './middleware'

Middleware.passwordProtect = function (ctx) {
  ctx.$passwordProtect.checkUserIfRedirect()
}

const defaultOptions = {
  queryString: '_password',
  tokenSeed: 103094582309,
  cookieName: '_password',
  formPath: '/password',
  password: 'password',
  cookie: {
    prefix: '',
    expires: 2
  }
}

export default (ctx, inject) => {
  const options = {
    ...defaultOptions,
    ...JSON.parse(`<%= JSON.stringify(options) %>`)
  }

  const storage = new Storage(ctx, options)

  const $passwordProtect = {

    authorise: (password) => {
      if (typeof options.password === 'string') {
        if (password === options.password) {
          const token = generateToken(password, options.tokenSeed)
          storage.setCookie(options.cookieName, token)
        }
      }
    },

    isAuthorised: () => {
      const password = options.password

      const cookieValue = storage.getCookie(options.cookieName)
      const token = generateToken(password, options.tokenSeed)

      return cookieValue === token
    },

    removeAuthorisation: () => {
      storage.removeCookie(options.cookieName)
    },

    checkUserIfRedirect: () => {
      const password = options.password

      if (options.queryString) {
        const queryPassword = ctx.route.query[options.queryString]

        if (queryPassword === password) {
          $passwordProtect.authorise(queryPassword)
          return
        }
      }

      const cookieValue = storage.getCookie(options.cookieName)

      if (ctx.route.path === options.formPath) {
        return true
      }

      if (!cookieValue || cookieValue !== generateToken(password, options.tokenSeed)) {
        ctx.redirect(options.formPath)
      }
    }
  }

  inject('passwordProtect', $passwordProtect)
  ctx.$passwordProtect = $passwordProtect
}
