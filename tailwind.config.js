/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px', 
        'sm': '640px', 
        'md': '768px', 
        'lg': '1024px', 
        'xl': '1280px', 
      },

      fontFamily: {
        'handjet': ['Handjet', 'cursive'],
        'permanent-Marker': ['Permanent Marker', 'cursive'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'tektur': ['Tektur', 'cursive'],

      },
      animationDelay: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms', 
      },
      keyframes: {
        'fade_up_hide': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0rem)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-2rem)',
          },
        },
        'fade_down_hide': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0rem)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(2rem)',
          },
        },
        'fade_left_hide': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0rem)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(-2rem)',
          },
        },
        'fade_right_hide': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0rem)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(2rem)',
          },
        },
        'flip-up-reverse': {
          '0%': {
            transform: 'rotateX(0deg)',
            'transform-origin': 'bottom',
          },
          '100%': {
            transform: 'rotateX(90deg)',
            'transform-origin': 'bottom',
          },
        },
      },
      animation: {
        'fade-up-hidden': 'fade_up_hide 1s both ease-in',
        'fade-down-hidden': 'fade_down_hide 1s both ease-in',
        'fade-left-hidden': 'fade_left_hide 1s both ease-in',
        'fade-right-hidden': 'fade_right_hide 1s both ease-in',
        'flip-up-reverse': 'flip-up-reverse 1s both',
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ]
}
