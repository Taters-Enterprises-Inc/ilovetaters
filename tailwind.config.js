/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#a21013',
        'primarylight' : '#ff584f',
        'primaryDark' : '#22201A',
        'primaryOrange' : '#ffcd17' ,
        'secondary': '#373f50',
      },
    },
  },
  plugins: [],
}
