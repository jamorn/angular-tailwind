/*module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),  // ถ้าใช้
    require('@tailwindcss/aspect-ratio'),  // ถ้าใช้
    require('tailwind-scrollbar')  // ถ้าใช้
  ]
}
 module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.js'
    },
    'postcss-import': {},
    'autoprefixer': {
      overrideBrowserslist: ['last 2 versions', '> 1%']
    }
  }
} */

/* module.exports = {
  plugins: {
    'tailwindcss': './tailwind.config.js',
    'postcss-import': {},
    'autoprefixer': {}
  }
}
 */
/* const postcssImport = require('postcss-import');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss({
      config: './tailwind.config.js'
    }),
    autoprefixer({
      overrideBrowserslist: ['last 2 versions', '> 1%']
    })
  ]
} */
/* 
module.exports = {
  plugins: [
    require('postcss-import'),
    require('@tailwindcss/postcss')({
      config: './tailwind.config.js'
    }),
    require('autoprefixer')({
      overrideBrowserslist: ['last 2 versions', '> 1%']
    })
  ]
}
 */
/* module.exports = {
    plugins: [
      require('postcss-import'),
      require('tailwindcss/nesting'),
      require('tailwindcss'),
      require('autoprefixer')
    ]
  } */
 /* 
    module.exports = {
      plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss')({
          config: './tailwind.config.js'
        }),
        require('autoprefixer')({
          // เพิ่ม options สำหรับ browser support
          overrideBrowserslist: ['last 2 versions', '> 1%']
        })
      ]
    }*/
   /*
      module.exports = {
        plugins: {
          'postcss-import': {},
          '@tailwindcss/postcss': {  // เปลี่ยนจาก tailwindcss เป็น @tailwindcss/postcss
            config: './tailwind.config.js'
          },
          'autoprefixer': {
            overrideBrowserslist: ['last 2 versions', '> 1%']
          }
        }
      } */
     /*
module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {
      config: './tailwind.config.js'
    },
    'autoprefixer': {
      overrideBrowserslist: ['last 2 versions', '> 1%']  // กำหนด browser support
    }
  }
} */
/* 
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {  // เปลี่ยนกลับเป็น tailwindcss
      config: './tailwind.config.js'
    },
    'autoprefixer': {
      overrideBrowserslist: ['last 2 versions', '> 1%']
    }
  }
}*/
