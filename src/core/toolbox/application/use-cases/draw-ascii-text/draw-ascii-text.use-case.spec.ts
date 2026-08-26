import { DrawAsciiTextUseCase } from './draw-ascii-text.use-case';

describe('DrawAsciiTextUseCase', () => {
  const useCase = new DrawAsciiTextUseCase();

  it('draws a banner for "HI"', () => {
    expect(useCase.execute('HI')).toBe(
      ['#.# ###', '#.# .#.', '### .#.', '#.# .#.', '#.# ###'].join('\n'),
    );
  });

  it('is case-insensitive', () => {
    expect(useCase.execute('hi')).toBe(useCase.execute('HI'));
  });

  it('renders unsupported characters as blank glyphs', () => {
    const result = useCase.execute('H!');
    const lines = result.split('\n');
    expect(lines.every((line) => line.endsWith('...'))).toBe(true);
  });

  it('returns an empty string for empty input', () => {
    expect(useCase.execute('')).toBe('');
  });
});
