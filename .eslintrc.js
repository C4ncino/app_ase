// https://docs.expo.dev/guides/using-eslint/

module.exports = {
  plugins: ["prettier"],
  extends: ["expo", "prettier"],
  rules: {
    "prettier/prettier": "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
  },
  settings: {
    "import/resolver": {
      typescript: {
        baseUrl: "./",
        paths: {
          "@src/*": ["./src/*"],
        },
      },
    },
  },
};
