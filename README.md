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

# TODO
## End-to-End Testing

**Recommended for future implementation:** Add Cypress or Playwright for comprehensive application testing.

**Why E2E testing is important:**
- **User Journey Testing**: Validate complete user workflows from start to finish
- **Browser Compatibility**: Test across different browsers and devices
- **Integration Testing**: Ensure all components work together in a real browser environment
- **Visual Regression**: Catch UI changes that might break the user experience
- **Performance Testing**: Monitor page load times and application responsiveness

**Playwright vs Cypress:**
- **Playwright**: Better for cross-browser testing (Chrome, Firefox, Safari, Edge), faster execution, better CI/CD integration
- **Cypress**: More developer-friendly debugging experience, excellent documentation, strong community

For this project, we'd recommend **Playwright** due to its superior performance and cross-browser capabilities, especially useful for testing the caching fetch functionality across different browser environments.

## Build & Deployment

- Docker Configuration: Dockerfile and docker-compose.yml for containerization

## Development Experience

- Hot Reloading: Development server with hot module replacement

## Security & Environment Management

- Environment Variables: .env files for different environments (development, staging, production)

# Caching Fetch Library Documentation

- useCachingFetch: A React hook that fetches data from a URL and caches it to prevent duplicate network requests across multiple components.

- preloadCachingFetch: A server-side function that pre-fetches and caches data before rendering, enabling server-side rendering with populated data.

- serializeCache: Converts the in-memory cache to a JSON string for transferring cached data from server to browser during SSR hydration.

- initializeCache: Restores the cache from a serialized JSON string on the browser side to maintain cached data after SSR hydration.

- wipeCache: Clears all cached data and pending fetch flags.
