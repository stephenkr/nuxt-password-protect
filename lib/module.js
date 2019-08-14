const { resolve } = require('path')

function featureToggleModule (moduleOptions) {
  const options = {
    ...this.options['password-protect'],
    ...this.options.passwordProtect,
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'password-protect.js',
    options: {
      ...options
    },
    ssr: true
  })

  this.addTemplate({
    fileName: 'password-protect/storage.js',
    src: resolve(__dirname, 'password-protect/storage.js')
  })

  this.addTemplate({
    fileName: 'password-protect/main.js',
    src: resolve(__dirname, 'password-protect/main.js')
  })

  this.addTemplate({
    fileName: 'password-protect/utils.js',
    src: resolve(__dirname, 'password-protect/utils.js')
  })
}

module.exports = featureToggleModule
module.exports.meta = require('../package.json')
