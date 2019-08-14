import { parse as parseCookie, serialize as serializeCookie } from 'cookie'

export class Storage {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options
  }

  getCookies () {
    const cookieStr = process.client
      ? document.cookie
      : this.ctx.req.headers.cookie

    return parseCookie(cookieStr || '') || {}
  }

  setCookie (key, value, options = {}) {
    if (!this.options.cookie || (process.server && !this.ctx.res)) return

    const _key = this.options.cookie.prefix + key
    const _options = Object.assign({}, this.options.cookie.options, options)
    const _value = value

    if (!value) {
      _options.maxAge = -1
    }

    if (typeof _options.expires === 'number') {
      _options.expires = new Date(new Date() * 1 + _options.expires * 864e+5)
    }

    const serializedCookie = serializeCookie(_key, _value, _options)

    if (process.client) {
      document.cookie = serializedCookie
    } else if (process.server && this.ctx.res) {
      const prevCookies = this.ctx.res.getHeader('Set-Cookie')
      this.ctx.res.setHeader('Set-Cookie', [].concat(prevCookies, serializedCookie).filter(v => v))
    }

    return value
  }

  getCookie (key) {
    if (!this.options.cookie || (process.server && !this.ctx.req)) return

    const _key = this.options.cookie.prefix + key
    const cookies = this.getCookies()

    return cookies[_key] ? decodeURIComponent(cookies[_key]) : undefined
  }

  removeCookie (key, options) {
    this.setCookie(key, undefined, options)
  }
}
