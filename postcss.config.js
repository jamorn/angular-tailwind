const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss('./tailwind.config.js'),
    autoprefixer({
      overrideBrowserslist: ['last 2 versions', '> 1%']
    })
  ]
}