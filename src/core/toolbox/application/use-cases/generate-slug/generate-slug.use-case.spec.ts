import { GenerateSlugUseCase } from './generate-slug.use-case';

describe('GenerateSlugUseCase', () => {
  const useCase = new GenerateSlugUseCase();

  it('slugifies a sentence with punctuation', () => {
    expect(useCase.execute('Hello World Example!')).toBe('hello-world-example');
  });

  it('collapses repeated whitespace into a single hyphen and strips underscores', () => {
    expect(useCase.execute('Hello   World__Example')).toBe(
      'hello-worldexample',
    );
  });

  it('collapses repeated hyphens into one', () => {
    expect(useCase.execute('Hello---World')).toBe('hello-world');
  });

  it('trims leading and trailing hyphens', () => {
    expect(useCase.execute('  -Hello World-  ')).toBe('hello-world');
  });

  it('returns an empty string for input with no slug-able characters', () => {
    expect(useCase.execute('!!!')).toBe('');
  });
});
