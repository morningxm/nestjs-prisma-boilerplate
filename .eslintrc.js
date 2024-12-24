module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Enable strict rules
    'no-unused-vars': 'off',
    '@typescript-eslint/interface-name-prefix': 'off', // Optionally enable if needed
    '@typescript-eslint/explicit-function-return-type': 'off', // Require explicit return types
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Require explicit return types on module boundaries
    '@typescript-eslint/no-explicit-any': 'error', // Disallow usage of the 'any' type
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ], // Disallow unused variables, allowing unused parameters prefixed with _
    'prefer-const': 'error', // Suggest using const for variables that are never reassigned
    eqeqeq: 'error', // Require === and !==
    curly: 'error', // Require curly braces for all control statements
    'no-duplicate-imports': 'error', // Disallow duplicate imports
    'no-console': 'warn', // Warn when console.log statements are used
  },
};
