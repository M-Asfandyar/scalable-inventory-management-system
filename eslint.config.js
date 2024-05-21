// eslint.config.js
module.exports = [
  {
    ignores: ["node_modules/", "dist/"]
  },
  {
    files: ["*.js"],
    env: {
      node: true,
    },
    rules: {
      "constructor-super": "error",
      "no-unused-vars": ["error", { "args": "none" }],
      "no-undef": "error",
      // Add other rules as needed
    },
    globals: {
      process: "readonly",
      Buffer: "readonly",
      describe: "readonly",
      it: "readonly"
    }
  }
];
