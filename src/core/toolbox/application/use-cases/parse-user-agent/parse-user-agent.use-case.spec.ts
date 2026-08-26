import { ParseUserAgentUseCase } from './parse-user-agent.use-case';

describe('ParseUserAgentUseCase', () => {
  const useCase = new ParseUserAgentUseCase();

  it('parses a desktop Chrome on Windows user agent', () => {
    const result = useCase.execute(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(result.browserName).toBe('Chrome');
    expect(result.browserVersion).toBe('120.0.0.0');
    expect(result.osName).toBe('Windows');
    expect(result.deviceType).toBe('desktop');
  });

  it('parses a mobile Safari on iOS user agent', () => {
    const result = useCase.execute(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    );
    expect(result.browserName).toBe('Mobile Safari');
    expect(result.osName).toBe('iOS');
    expect(result.deviceType).toBe('mobile');
  });

  it('falls back to "Unknown" for missing fields on an empty string', () => {
    const result = useCase.execute('');
    expect(result.browserName).toBe('Unknown');
    expect(result.osName).toBe('Unknown');
    expect(result.deviceType).toBe('desktop');
  });
});
