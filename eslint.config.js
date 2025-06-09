import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Global ignores - these files are completely ignored
  {
    ignores: [
      // Dependencies
      'node_modules/**/*',

      // Build outputs
      'dist/**/*',
      'build/**/*',
      'coverage/**/*',
      '.next/**/*',

      // Generated files
      'mockServiceWorker.js',
      '*.min.js',
      '*.tsbuildinfo',

      // Configuration files
      'eslint.config.js',
      '.eslintrc.*',
      '*.config.js',
      '*.config.ts',
      'jest.config.js',

      // Environment files
      '.env*',

      // IDE files
      '.vscode/**/*',
      '.idea/**/*',

      // OS generated files
      '.DS_Store',
      '.DS_Store?',

      // Logs
      '*.log',
      'npm-debug.log*',

      // Cache files
      '.eslintcache',
      '.prettierCache',
    ],
  },

  // Base configuration for all JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        global: 'readonly',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-console': 'warn',
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Apply prettier config last to override conflicting rules
  prettierConfig,
];
