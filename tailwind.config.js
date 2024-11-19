/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.html"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2b98d4',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
