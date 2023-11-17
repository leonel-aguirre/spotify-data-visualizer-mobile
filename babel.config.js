module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src/"],
          alias: {
            "@Components": "./src/components",
            "@Styles": "./src/styles",
            "@Screens": "./src/screens",
            "@State": "./src/state",
          },
        },
      ],
    ],
  }
}
