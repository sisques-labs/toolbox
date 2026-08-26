import { ParseUrlUseCase } from './parse-url.use-case';

describe('ParseUrlUseCase', () => {
  const useCase = new ParseUrlUseCase();

  it('parses the parts of a full URL', () => {
    const result = useCase.execute(
      'https://user:pass@example.com:8080/a/b?x=1&y=2#section',
    );
    expect(result).toEqual({
      ok: true,
      protocol: 'https:',
      hostname: 'example.com',
      port: '8080',
      pathname: '/a/b',
      hash: '#section',
      searchParams: [
        { key: 'x', value: '1' },
        { key: 'y', value: '2' },
      ],
    });
  });

  it('defaults missing parts sensibly', () => {
    const result = useCase.execute('https://example.com');
    expect(result.ok).toBe(true);
    expect(result.port).toBe('');
    expect(result.pathname).toBe('/');
    expect(result.searchParams).toEqual([]);
  });

  it('rejects an invalid URL', () => {
    expect(useCase.execute('not a url').ok).toBe(false);
  });
});
