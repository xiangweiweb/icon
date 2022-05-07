module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["plugin:vue/essential"],
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            // 添加ES特性支持，使之能够识别ES6语法
            "jsx": true
        }
    },
    "plugins": [
        "vue"
    ]
};
