const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    env: {
        es6: true,
        browser: true,
        node: true
    }
})