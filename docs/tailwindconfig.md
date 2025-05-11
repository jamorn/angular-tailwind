

# วิเคราะห์การใช้ Animations ใน TailwindCSS

<div class="tw-animate-wiggle">...</div>
<div class="tw-animate-fade-in-down">...</div>
<div class="tw-animate-fade-out-down">...</div>
<div class="tw-animate-fade-in-up">...</div>
<div class="tw-animate-fade-out-up">...</div>

2. กรณีที่มักใช้ Animations
Modal เปิด/ปิด

เปิด: tw-animate-fade-in-down
ปิด: tw-animate-fade-out-up
Notification

แสดง: tw-animate-fade-in-up
ซ่อน: tw-animate-fade-out-down
Loading States

Loading spinner: tw-animate-wiggle
Message Alerts

Error messages: tw-animate-fade-in-down
Success messages: tw-animate-fade-in-up

3. Configuration Example

module.exports = {
  theme: {
    extend: {
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out'
      }
    }
  }
}



/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#374151',
          200: '#1f2937',
          300: '#111827',
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out'
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out-down': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false
  }
}

# ค่าเดิม ก่อนแก้
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
      boxShadow: {
        'custom': '0px 0px 50px 0px rgb(82 63 105 / 15%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')
  ],
}

# แก้ครั้งที่ 1 แบบ 
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'], // เก็บแค่ font ที่ใช้จริง
      },
      colors: {
        // เพิ่ม custom colors สำหรับ dark theme
        dark: {
          100: '#374151',
          200: '#1f2937',
          300: '#111827',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // จำเป็นสำหรับ form styling
  ],
  corePlugins: {
    preflight: false // ป้องกัน conflict กับ styles อื่น
  }
}

# แก้ครั้งที่ 1 การเปลี่ยนแปลงที่สำคัญ:

ลบ animations ที่ไม่ได้ใช้
ลบ fonts ที่ไม่จำเป็น (poppins, nunito)
เพิ่ม custom colors สำหรับ dark theme
ลบ plugins ที่ไม่จำเป็น
เพิ่ม preflight: false เพื่อป้องกัน style conflicts

