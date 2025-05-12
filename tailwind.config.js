module.exports = {
    content: [
      './app/views/**/*.{erb,html}',
      './app/helpers/**/*.rb',
      './app/javascript/**/*.js'
    ],
    theme: {
      extend: {
        colors: {
          primary: '#22c55e', // correspond au vert-600 de Tailwind
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }