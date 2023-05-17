module.exports = {
  plugins: [
    'simple-import-sort',
    'unicorn'
  ],
  extends: [
    'madbooster-node-app'
  ],
  rules: {
    'n/no-missing-import': 2,
    'n/no-extraneous-import': 2,
    'n/file-extension-in-import': 2,

    'import/no-unresolved': 2,
    'import/no-useless-path-segments': 2,
    'import/no-extraneous-dependencies': 2,
    'import/no-commonjs': [2, { allowRequire: true }],
    'import/extensions': [2, 'ignorePackages'],
    'simple-import-sort/imports': 2,
    'sort-imports': 0, // import sort plugin needs this
    'import/order': 0,
    'import/newline-after-import': 2,
    'unicorn/prefer-module': 2,
    'unicorn/prefer-node-protocol': 2,
    'lodash/prefer-lodash-typecheck': 0
  }
}
