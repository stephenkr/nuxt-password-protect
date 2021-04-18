import { generateToken } from '../lib/password-protect/utils.js'
import { getPasswordProtect } from '../lib/password-protect/main.js'

const baseCtx = {
  redirect: jest.fn(),
  route: {
    query: {},
    path: '',
    fullPath: ''
  },
  req: {
    headers: {
      cookie: ''
    }
  },
  res: {
    getHeader: jest.fn(() => ''),
    setHeader: jest.fn()
  }
}

describe('PasswordProtect', () => {
  describe('authorise', () => {
    it('should correctly create a cookie if the password is correct', () => {
      const options = {
        password: 'password',
        cookieName: '_pw',
        tokenSeed: '123'
      }

      const setCookieMock = jest.fn()
      const token = generateToken(options.password, options.tokenSeed)

      const passwordProtectInstance = getPasswordProtect({
        ctx: baseCtx,
        options,
        storage: {
          setCookie: setCookieMock
        }
      })

      passwordProtectInstance.authorise(options.password)
      expect(setCookieMock).toBeCalledWith(options.cookieName, token)
    })
  })

  describe('isAuthorised', () => {
    it('should correctly determine if the cookie is authorised', () => {
      const options = {
        password: 'password',
        cookieName: '_pw',
        tokenSeed: '123'
      }

      const token = generateToken(options.password, options.tokenSeed)
      const getCookieMock = jest.fn(() => token)

      const passwordProtectInstance = getPasswordProtect({
        ctx: baseCtx,
        options,
        storage: {
          getCookie: getCookieMock
        }
      })

      const actual = passwordProtectInstance.isAuthorised()
      expect(actual).toBe(true)
    })

    it('should correctly determine if the cookie is not authorised', () => {
      const options = {
        password: 'password',
        cookieName: '_pw',
        tokenSeed: '123'
      }

      const getCookieMock = jest.fn(() => 'something else')

      const passwordProtectInstance = getPasswordProtect({
        ctx: baseCtx,
        options,
        storage: {
          getCookie: getCookieMock
        }
      })

      const actual = passwordProtectInstance.isAuthorised()
      expect(actual).toBe(false)
    })
  })

  describe('removeAuthorisation', () => {
    it('should correctly remove the cookie', () => {
      const options = {
        cookieName: '_pw'
      }

      const removeCookieMock = jest.fn()

      const passwordProtectInstance = getPasswordProtect({
        ctx: baseCtx,
        options,
        storage: {
          removeCookie: removeCookieMock
        }
      })

      passwordProtectInstance.removeAuthorisation()
      expect(removeCookieMock).toBeCalledWith(options.cookieName)
    })
  })

  describe('checkUserIfRedirect', () => {
    const options = {
      password: 'password',
      cookieName: '_pw',
      tokenSeed: '123',
      formPath: '/password1'
    }

    it('should correctly redirect the user if not authorised', () => {
      const getCookieMock = jest.fn(() => 'something else')
      const redirectMock = jest.fn()

      const passwordProtectInstance = getPasswordProtect({
        ctx: {
          ...baseCtx,
          redirect: redirectMock
        },
        options,
        storage: {
          getCookie: getCookieMock
        }
      })

      passwordProtectInstance.checkUserIfRedirect()
      expect(redirectMock).toBeCalledWith(options.formPath, {
        previousPath: ''
      })
    })

    it('should correctly not redirect the user if the option `enabled` is set to false', () => {
      const getCookieMock = jest.fn(() => 'something else')
      const redirectMock = jest.fn()

      const passwordProtectInstance = getPasswordProtect({
        ctx: {
          ...baseCtx,
          redirect: redirectMock
        },
        options: {
          ...options,
          enabled: false
        },
        storage: {
          getCookie: getCookieMock
        }
      })

      passwordProtectInstance.checkUserIfRedirect()
      expect(redirectMock).not.toBeCalled()
    })

    it('should not redirect the user if authorised', () => {
      const token = generateToken(options.password, options.tokenSeed)
      const getCookieMock = jest.fn(() => token)
      const redirectMock = jest.fn()

      const passwordProtectInstance = getPasswordProtect({
        ctx: {
          ...baseCtx,
          redirect: redirectMock
        },
        options,
        storage: {
          getCookie: getCookieMock
        }
      })

      passwordProtectInstance.checkUserIfRedirect()
      expect(redirectMock).not.toBeCalledWith(options.formPath)
    })

    it('should not redirect the user if on the password page', () => {
      const getCookieMock = jest.fn(() => 'is something else')
      const redirectMock = jest.fn()

      const passwordProtectInstance = getPasswordProtect({
        ctx: {
          ...baseCtx,
          redirect: redirectMock,
          route: {
            path: options.formPath
          }
        },
        options,
        storage: {
          getCookie: getCookieMock
        }
      })

      passwordProtectInstance.checkUserIfRedirect()
      expect(redirectMock).not.toBeCalledWith(options.formPath)
    })

    it('should correctly be handled by the redirect callback if registered', () => {
      const getCookieMock = jest.fn(() => 'something else')
      const registerRedirectCallback = jest.fn()

      const passwordProtectInstance = getPasswordProtect({
        ctx: {
          ...baseCtx
        },
        options,
        storage: {
          getCookie: getCookieMock
        }
      })

      passwordProtectInstance.registerRedirectCallback(registerRedirectCallback)

      passwordProtectInstance.checkUserIfRedirect()
      expect(registerRedirectCallback).toBeCalledWith({
        options
      })
    })
  })
})
