/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      textColor: {
        primary: "#46e7ff",
        blue: "#46afff",
        white: "#fff",
        gray: "#d1daea",
        darkGray: "#6b727b",
        red: "#f56565"
      },
      fontSize: {
        sm: ".875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem"
      },
      backgroundColor: {
        lightblue: "#7ae7f4",
        iceblue: "#b5cfff",
        google: "#DB4437"
      },
      container: {
        center: true
      },
      boxShadow: {
        default:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.04)"
      },
      borderRadius: {
        lg: "20px",
        md: "30px"
      },
      width: {
        "72": "18rem",
        sm: "20rem"
      },
      minWidth: {
        "3": "3rem"
      },
      inset: {
        "0": 0,
        "10": "10px",
        "20": "20px",
        "30": "30px"
      }
    },
    variants: {}
  }
};
