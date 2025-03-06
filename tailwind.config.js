/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ["Playwrite IT Moderna", "sans-serif"],
        jerom:["Space Mono"],
      },
      colors: {
        "base-white": "#fff",
        whitesmoke: "#ececec",
        gray1: "rgba(255, 255, 255, 0.55)",
        seashell: "rgba(251, 241, 236, 0.44)",
        "primary-colors-dark-jungle-green": "#202124",
        dimgray: "#626262",
        blueviolet: "#8046f1",
        black: "#000",
        mediumslateblue: "#9961ff",
        "gray-600": "#475467",
        "gray-300": "#d0d5dd",
        "grey-colors-grey-300": "#e3e5ed",
        "gray-700": "#344154",
      },
      spacing: {},
      // fontFamily: {
      //   sora: "Sora",
      //   "instrument-sans": "'Instrument Sans'",
      //   "text-sm-regular": "Inter",
      //   poppins: "Poppins",
      // },
      borderRadius: {
        "10xl": "29px",
        mid: "17px",
        "29xl": "48px",
      },
    },
  },
  plugins: [require("daisyui")],
};
