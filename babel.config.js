module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "12" // Target Node.js 12.x for CodeGrade
        }
      }
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining"
  ]
};

