/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ED1F24',
        'primarylight' : '#ff584f',
        'primaryDark' : '#22201A',
        'primaryOrange' : '#ffcd17' ,
        'secondary': '#373f50',
      },
    },
  },
  plugins: [],
}
