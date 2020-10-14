module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: ["@babel/plugin-transform-runtime"],
  env: {
    test: {
      presets: ["@babel/preset-env"],
    }
  }
}
