import { GenerateNumeronymUseCase } from './generate-numeronym.use-case';

describe('GenerateNumeronymUseCase', () => {
  const useCase = new GenerateNumeronymUseCase();

  it('numeronymizes a long word', () => {
    expect(useCase.execute('internationalization')).toBe('i18n');
  });

  it('numeronymizes another long word', () => {
    expect(useCase.execute('localization')).toBe('l10n');
    expect(useCase.execute('accessibility')).toBe('a11y');
  });

  it('leaves short words (5 characters or fewer) unchanged', () => {
    expect(useCase.execute('cat')).toBe('cat');
    expect(useCase.execute('word')).toBe('word');
  });

  it('numeronymizes every long word in a sentence, preserving spacing', () => {
    expect(useCase.execute('Hello internationalization world')).toBe(
      'Hello i18n world',
    );
  });

  it('returns an empty string for empty input', () => {
    expect(useCase.execute('')).toBe('');
  });
});
