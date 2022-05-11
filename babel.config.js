module.exports = {
    "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {
              "edge": "17",
              "firefox": "60",
              "chrome": "57",
              "safari": "12"
            },
            "useBuiltIns": "usage",
            "corejs": "3.6.5"
          }
        ]
      ]
}
