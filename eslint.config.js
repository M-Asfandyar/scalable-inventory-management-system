// eslint.config.js
module.exports = [
  {
    ignores: ["node_modules/", "dist/"]
  },
  {
    files: ["*.js"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      globals: {
        browser: true,
        es2021: true,
        node: true
      }
    },
    rules: {
      "constructor-super": "error",
    }
  }
];
