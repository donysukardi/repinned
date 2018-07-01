const babelConfig = require('kcd-scripts/config').babel

module.exports = Object.assign(babelConfig, {
  plugins: babelConfig.plugins.filter(x => !x.includes("babel-plugin-external-helpers"))
})
