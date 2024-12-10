module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Add modern font family
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00a5da",
          secondary: "#0000ff",
          accent: "#ec4800",
          neutral: "#13120d",
          "base-100": "#222d34",
          info: "#00f4ff",
          success: "#00a472",
          warning: "#ff9b00",
          error: "#fe6b68",
        },
      },
    ],
  },
};
