const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    ['@features']: path.resolve(__dirname, './src/features'),
    ['@common']: path.resolve(__dirname, './src/common'),
    ['@components']: path.resolve(__dirname, './src/components'),
    ['@state']: path.resolve(__dirname, './src/state'),
    ['@pages']: path.resolve(__dirname, './src/pages'),
    ['@services']: path.resolve(__dirname, './src/services'),
    ['@utils']: path.resolve(__dirname, './src/utils'),
  })
)
