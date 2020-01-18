import { generateToken } from './utils'

export const getPasswordProtect = ({ options, ctx, storage }) => {
  const passwordProtect = {

    authorise: (password) => {
      if (typeof options.password === 'string') {
        if (password === options.password) {
          const token = generateToken(password, options.tokenSeed)
          storage.setCookie(options.cookieName, token)
          return true
        } else {
          return false
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
          passwordProtect.authorise(queryPassword)
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

  return passwordProtect
}
