const path = require('path')

const {
  override,
  useBabelRc,
  useEslintRc,
  addWebpackAlias,
} = require('customize-cra')

module.exports = {
  webpack: override(
    useBabelRc(),
    useEslintRc(),
    addWebpackAlias({
      '~': path.resolve(__dirname, 'src'),
    })
  ),
}
