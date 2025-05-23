const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,  // กำหนดว่าจะใช้กับไฟล์ .css
        include: path.resolve(__dirname, 'node_modules/flatpickr'),  // เฉพาะ CSS ใน flatpickr เท่านั้น
        use: [
          'style-loader',  // โหลด CSS เป็น style tags
          'css-loader'     // แปลง CSS เป็น JavaScript modules
        ]
      }
    ]
  }
};
