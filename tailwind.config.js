import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: 'Open Sans, serif'
      },
    },
  },
  plugins: [daisyui,],

  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line no-undef
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#C71A42",
          secondary: "#FCE0A2",
        },
      },
      /*  {
         dark: {
           // eslint-disable-next-line no-undef
           ...require("daisyui/src/theming/themes")["dark"],
           primary: "##1C7BFE",
           secondary: "#FCE0A2",
         },
       }, */
      'light', 'dark'
    ],
  },
  darkMode: ['selector', '[data-theme="dark"]']
}

