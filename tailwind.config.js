/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/views/**/*.{erb,html}',
      './app/helpers/**/*.rb',
      './app/javascript/**/*.js'
    ],
    theme: {
      extend: {
        colors: {
          primary: '#16a34a', // correspond à green-600
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }