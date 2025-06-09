# Introduction

This project contains a framework, a caching fetch library, and a web application.

The framework contains:

- a server
- a client runtime
- an MSW mock server, to allow you to run this project without a network connection.

The application will render a very basic directory of people.

# Starting the App

Install dependencies and start the app

```bash
npm i
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app running.

# Testing with Jest

This project uses Jest as the testing framework with TypeScript support via ts-jest.

## Running Tests

Run all tests once:

```bash
npm test
```

Run tests in watch mode (re-runs when files change):

```bash
npm run test:watch
```

# Linting with ESLint

This project uses ESLint v9 with TypeScript and React support for code quality and consistency.

## Running ESLint

Check for linting errors:

```bash
npm run lint
```

Auto-fix linting errors where possible:

```bash
npm run lint:fix
```

## Code Formatting with Prettier

Format all files:

```bash
npm run format
```

Check if files are properly formatted:

```bash
npm run format:check
```

**Note:** ESLint and Prettier are configured to work together, so running `npm run lint:fix` will also apply Prettier formatting.

# CI/CD with GitHub Actions

This project includes a GitHub Actions workflow that automatically runs on:
- Pushes to the `main` branch
- Pull requests targeting the `main` branch

The CI pipeline runs:
- **Linting** with ESLint
- **Tests** with Jest
- **Code formatting checks** with Prettier
- Tests on both **Node.js 18** and **Node.js 20**

The workflow file is located at `.github/workflows/ci.yml`.
