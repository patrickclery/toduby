module.exports = {
  plugins: [
    require("autoprefixer"),
    require("tailwindcss")("./src/tailwind.config.js")
  ]
}
