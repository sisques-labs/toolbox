import { ConvertColorUseCase } from './convert-color.use-case';

describe('ConvertColorUseCase', () => {
  const useCase = new ConvertColorUseCase();

  it('parses hex and returns hex, rgb and hsl', () => {
    expect(useCase.execute('#336699')).toEqual({
      ok: true,
      hex: '#336699',
      rgb: 'rgb(51, 102, 153)',
      hsl: 'hsl(210, 50%, 40%)',
    });
  });

  it('accepts short hex', () => {
    expect(useCase.execute('#39f')).toEqual({
      ok: true,
      hex: '#3399ff',
      rgb: 'rgb(51, 153, 255)',
      hsl: 'hsl(210, 100%, 60%)',
    });
  });

  it('parses rgb()', () => {
    expect(useCase.execute('rgb(255, 0, 128)')).toEqual({
      ok: true,
      hex: '#ff0080',
      rgb: 'rgb(255, 0, 128)',
      hsl: 'hsl(330, 100%, 50%)',
    });
  });

  it('parses hsl() and round-trips to hex', () => {
    const result = useCase.execute('hsl(120, 100%, 50%)');

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.hex).toBe('#00ff00');
    expect(result.rgb).toBe('rgb(0, 255, 0)');
    expect(result.hsl).toBe('hsl(120, 100%, 50%)');
  });

  it('reports invalid color input', () => {
    expect(useCase.execute('not-a-color')).toEqual({
      ok: false,
      error: 'invalid',
    });
  });
});
