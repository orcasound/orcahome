// lint-staged configuration for next 16.

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*': 'prettier --ignore-unknown --write',
}
