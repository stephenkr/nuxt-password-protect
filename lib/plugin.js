import { Storage } from './password-protect/storage'
import { getPasswordProtect } from './password-protect/main'

import Middleware from './middleware'

Middleware.passwordProtect = Middleware['password-protect'] = function (ctx) {
  ctx.$passwordProtect.checkUserIfRedirect()
}

const defaultOptions = {
  enabled: true,
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
    ...JSON.parse('<%= JSON.stringify(options) %>')
  }

  const storage = new Storage(ctx, options)

  const $passwordProtect = getPasswordProtect({ options, ctx, storage })

  inject('passwordProtect', $passwordProtect)
  ctx.$passwordProtect = $passwordProtect
  return $passwordProtect
}
