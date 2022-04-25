const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        'amber': colors.amber,
        'emerald': colors.emerald,
        'cyan': colors.cyan,
        'orange': '#f97316'
      }
    },
  },
  plugins: [],
}
