/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#a21013',
        'secondary' : '#22201A',
        'tertiary' : '#ffcd17' ,
        'button': '#CC5801'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
});
