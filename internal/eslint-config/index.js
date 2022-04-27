const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    env: {
        es6: true,
        browser: true,
        node: true
    },
    plugins: ["@typescript-eslin", 'prettier', "unicorn"],
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:jsonc/recommended-with-jsonc',
        'plugin:markdown/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx']
            }
        }
    },
    // 为特定类型文件指定特定处理器
    overrides: [
        {
            files: ['*.json', '*.json5', '*.jsonc'],
            parser: 'jsonc-eslint-parser'
        }, {
            files: ['*.ts', '*.vue'],
            rules: {
                'no-undef': 'off' // 访问未定义变量
            }
        }, {
            files: ['**/__test__/**'],
            rules: {
                'no-console': 'off',
                'vue/one-component-per-file': 'off'
            }
        }, {
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            rules: {
                'jsonc/sort-keys': [
                    'error',
                    {
                        pathPattent: '^$',
                        order: [
                            'name',
                            'version',
                            'private',
                            'packageManager',
                            'description',
                            'type',
                            'keywords',
                            'homepage',
                            'bugs',
                            'license',
                            'author',
                            'contributors',
                            'funding',
                            'files',
                            'main',
                            'module',
                            'exports',
                            'unpkg',
                            'jsdelivr',
                            'browser',
                            'bin',
                            'man',
                            'directories',
                            'repository',
                            'publishConfig',
                            'scripts',
                            'peerDependencies',
                            'peerDependenciesMeta',
                            'optionalDependencies',
                            'dependencies',
                            'devDependencies',
                            'engines',
                            'config',
                            'overrides',
                            'pnpm',
                            'husky',
                            'lint-staged',
                            'eslintConfig'
                        ]
                    }
                ]
            }
        }, {
            files: ['*.d.ts'],
            rules: {
                'import/no-duplicates': 'off' // 从一个文件多次导入包
            }
        }, {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off' // 禁止使用require
            }
        }, {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: '.vue',
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                'no-undef': 'off'
            }
        }, {
            files: ['**/*.md/*.js', '**/*.md/*.ts'],
            rules: {
                'no-console': 'off',
                'import/no-unresolved': 'off',
                '@typescript-eslint/no-unused-vars': 'off'
            }
        }
    ],
    rules: {

        // js/ts
        'camelcase': ['error', { properties: 'never' }], // 使用驼峰命名法
        'no-console': ['warn', { allow: ['error' ]}], // 禁止使用 console 
        'no-debugger': 'warn', // 禁用 debugger。
        'no-constant-condition': ['error', { checkLoops: false }], // 禁止在条件中使用常量表达式。
        'no-return-await': 'error', // 禁用 return await;
        'no-var': 'error', // 禁用 var。
        'no-empty': ['error', { allowEmptyCatch: true }], // 禁止出现空语句块。
        'prefer-const': [ // 使用 const 定义不会修改的变量。
            'warn',
            { destructuring: 'all', ignoreReadBeforeAssign: true },
        ],
        'prefer-arrow-callback': [ // 要求在回调中使用箭头函数
            'error',
            { allowNamedFunctions: false, allowUnboundThis: true },
        ],
        'object-shorthand': [ // 要求对象地面量使用简洁语法。
            'error',
            'always',
            { ignoreConstructors: false, avoidQuotes: true },
        ],
        'prefer-rest-params': 'error', // 要求使用剩余参数代替arguments。
        'prefer-spread': 'error', // 要求使用扩展运算符。
        'prefer-template': 'error', // 要求使用模板字母串

        'no-redeclare': 'off', // 禁止多次声明同一变量
        '@typescript-eslint/no-redeclare': 'error', // 禁止多次声明同一变量

        // 代码风格
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'no-alert': 'warn', // 禁止使用alert。
        'no-case-declarations': 'error', // 禁止在 case 或 default 子句中出现词法声明。
        'no-multi-str': 'error', // 禁止使用多行字符串。
        'no-with': 'error', // 禁止使用 with 语句。
        'no-void': 'error', // 禁止使用 void 操作符。
        'sort-imports': [
            'warn',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: false,
            }
        ],


        // stylistic-issues
        'prefer-exponentiation-operator': 'error',

        // ts
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型。
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { disallowTypeAnnotations: false }
        ],

        // vue
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    "void": "always",
                    "normal": "always",
                    "component": "always"
                },
                svg: 'always',
                math: 'always'
            }
        ],

        // prettier
        'prettier/prettier': 'error',

        // import
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/named': 'off',

        // eslint-plugin-eslint-comments
        'eslint-comments/no-unused-disable': ['error', { allowWholeFile: true }],

        // unicorn
        "unicorn/consistent-destructuring": "error", // 在单独访问每个属性时，强制使用已解构的对象及其变量。
        "unicorn/empty-brace-spaces": "error", // 强制括号之间没有空格。
        "unicorn/no-keyword-prefix": "error", // 禁止定义 new 或 class 开头的变量。
        "unicorn/no-lonely-if": "error", // 禁止嵌套 if 语句。
        "unicorn/no-nested-ternary": "error", // 禁止嵌套三元表达式。
        "unicorn/error-message": "error", // 强制在创建 Error 时传递提示信息。
        "unicorn/escape-case": "error", // 要求转义序列使用大写。如: \xA9
        "unicorn/import-index": "error", //强制使用 . 导入索引文件
        "unicorn/new-for-builtins": "error", // 强制使用new调用内置构造函数
        "unicorn/no-array-method-this-argument": "error", // 禁止在数组方法中使用this
        "unicorn/no-array-push-push": "error", // 将多个Array#push()组合成一个调用
        "unicorn/no-console-spaces": "error", // 不要在console.log中出现前后空格。
        "unicorn/no-for-loop": "error", // 强制使用 for-of 循环代替 for 循环。
        "unicorn/no-hex-escape": "error", // 强制使用 Unicode转义 代替 16进制转义。
        "unicorn/no-instanceof-array": "error", // 强制使用 Array.isArray() 方法 代替 instanceof Array。
        "unicorn/no-invalid-remove-event-listener": "error", // 强制在使用window.removeEventListener方法时传递具名函数。
        "unicorn/no-new-array": "error", // 禁止使用 new Array() 创建数组，可使用 Array.from() 代替。
        "unicorn/no-new-buffer": "error", // 禁止使用 new Buffer() ，可使用 Buffer.from() 代替。
        "unicorn/no-unsafe-regex": "off", // 禁止使用不安全的正则。
        "unicorn/number-literal-case": "error", // 强制数字字面值使用正确的大小写。
        "unicorn/prefer-array-find": "error", // 在取数组第一项时使用 find 方法代替 fliter 方法。
        "unicorn/prefer-array-flat-map": "error", // 使用 flatMap() 而不是 map().flat()。
        "unicorn/prefer-array-index-of": "error", // 在简单查找数组索引时优先使用Array#indexof()。
        "unicorn/prefer-array-some": "error", // 使用 some() 方法替换 filter() 方法检查数组长度。
        "unicorn/prefer-date-now": "error", // 使用 Date.now() 获取时间戳。
        "unicorn/prefer-dom-node-dataset": "error", // 使用 .dataset 设置 DOM 属性。
        "unicorn/prefer-includes": "error", // 检查是否存在于数组中时优先使用 includes() 方法。
        "unicorn/prefer-keyboard-event-key": "error", // 在设置键盘事件时，优先使用 key 的名词而不是 keycode。
        "unicorn/prefer-math-trunc": "error", // 强制使用 Math.trunc 而不是位操作符。
        "unicorn/prefer-modern-dom-apis": "error", // 使用新的 dom api 代替旧的 dom api。
        "unicorn/prefer-negative-index": "error", // 在使用 splice(), slice() 等方法时使用负数索引，而不是从 .length 计算。
        "unicorn/prefer-number-properties": "error", // 优先使用 Number 的静态属性而不是全局属性，如：isNaN、parseInt。
        "unicorn/prefer-optional-catch-binding": "error", // 如果 catch的参数没有使用，则应该忽略它。
        "unicorn/prefer-prototype-methods": "error", // 应该从原型中借用方法，而不是从实例中借用方法。
        "unicorn/prefer-query-selector": "error", // 获取dom时使用 .querySelect 系列方法代替 .getElement 系列方法。
        "unicorn/prefer-reflect-apply": "error", // 使用 Reflect.apply() 代替 Function#apply()。
        "unicorn/prefer-string-slice": "error", // 使用 String#slice() 代替 String#substr() 和 String#substring()。
        "unicorn/prefer-string-starts-ends-with": "error", // 使用 String#startsWith() 或 String#endsWith() 检查字符串是否以某某某开头或结尾。
        "unicorn/prefer-string-trim-start-end": "error", // 使用 String#trimStart() / String#trimEnd() 代替 String#trimLeft() / String#trimRight()。
        "unicorn/prefer-type-error": "error", // 强制在类型检查条件中抛出TypeError。
        "unicorn/throw-new-error": "error", // 强制在抛出错误时需要显示的使用new。
    }
})