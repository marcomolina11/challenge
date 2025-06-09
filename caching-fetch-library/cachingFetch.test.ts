import { serializeCache, wipeCache } from './cachingFetch';

describe('serializeCache', () => {
  beforeEach(() => {
    // Clear cache before each test
    wipeCache();
  });

  it('should return empty object string when cache is empty', () => {
    const result = serializeCache();
    expect(result).toBe('{}');
  });
});