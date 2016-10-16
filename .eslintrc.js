module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
      "node": true,
      "browser": true,
    },
    "rules": {
      "quotes": [1, "backtick"],
      "strict": 0,
      "import/no-dynamic-require": 0,
      "react/jsx-filename-extension": 0,
    },
};