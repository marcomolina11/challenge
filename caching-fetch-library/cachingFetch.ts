// You may edit this file, add new files to support this file,
// and/or add new dependencies to the project as you see fit.
// However, you must not change the surface API presented from this file,
// and you should not need to change any other files in the project to complete the challenge

import { useState, useEffect } from 'react';

type UseCachingFetch = (url: string) => {
  isLoading: boolean;
  data: unknown;
  error: Error | null;
};

// Simple cache object to store fetched data
// Keys are URLs, values are the fetched data
const cache: Record<string, unknown> = {};

// Flag to prevent duplicate requests
const fetchingUrls: Record<string, boolean> = {};

/**
 * 1. Implement a caching fetch hook. The hook should return an object with the following properties:
 * - isLoading: a boolean that is true when the fetch is in progress and false otherwise
 * - data: the data returned from the fetch, or null if the fetch has not completed
 * - error: an error object if the fetch fails, or null if the fetch is successful
 *
 * This hook is called three times on the client:
 *  - 1 in App.tsx
 *  - 2 in Person.tsx
 *  - 3 in Name.tsx
 *
 * Acceptance Criteria:
 * 1. The application at /appWithoutSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should only see 1 network request in the browser's network tab when visiting the /appWithoutSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const useCachingFetch: UseCachingFetch = url => {
  const [data, setData] = useState<unknown>(cache[url] || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If data is cached or already fetching, skip
    if (cache[url] !== undefined || fetchingUrls[url]) {
      setData(cache[url] || null);
      setIsLoading(!!fetchingUrls[url]);
      setError(null);
      return;
    }

    // Mark as fetching and start request
    fetchingUrls[url] = true;
    setIsLoading(true);
    setError(null);

    // Async IIFE
    (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();

        // Update cache and component state
        cache[url] = result;
        fetchingUrls[url] = false;
        setData(result);
        setIsLoading(false);
      } catch (err) {
        fetchingUrls[url] = false;
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { data, isLoading, error };
};

/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 *
 * This function will be called once on the server before any rendering occurs.
 *
 * Any subsequent call to useCachingFetch should result in the returned data being available immediately.
 * Meaning that the page should be completely serverside rendered on /appWithSSRData
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript disabled, you should see a list of people.
 * 2. You have not changed any code outside of this file to achieve this.
 * 3. This file passes a type-check.
 *
 */
export const preloadCachingFetch = async (url: string): Promise<void> => {
  // Don't fetch if already cached
  if (cache[url] !== undefined) {
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    // Store in cache so useCachingFetch can access it immediately
    cache[url] = data;
  } catch (error) {
    // For server-side preloading, log the error instead of throwing so the entire page does not crash
    console.error('Failed to preload data for URL:', url, error);
  }
};

/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const serializeCache = (): string => {
  return JSON.stringify(cache);
};

export const initializeCache = (serializedCache: string): void => {
  try {
    // Parse the serialized cache and merge it with the current cache
    const parsedCache = JSON.parse(serializedCache);

    // Copy all entries from the parsed cache to our cache object
    Object.assign(cache, parsedCache);
  } catch (error) {
    // If parsing fails, log the error but don't crash the application
    console.error('Failed to initialize cache from serialized data:', error);
  }
};

export const wipeCache = (): void => {
  // Clear all cached data by removing all properties from the cache object
  Object.keys(cache).forEach(key => {
    delete cache[key];
  });

  // Clear any pending fetch flags to reset state completely
  Object.keys(fetchingUrls).forEach(key => {
    delete fetchingUrls[key];
  });
};
