module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-color-rgba-fallback"),
    require("postcss-nested"),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
