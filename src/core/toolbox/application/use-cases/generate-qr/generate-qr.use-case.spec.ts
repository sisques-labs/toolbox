import { renderSVG } from 'uqr';
import { GenerateQrUseCase } from './generate-qr.use-case';

describe('GenerateQrUseCase', () => {
  const useCase = new GenerateQrUseCase();

  it('renders an SVG QR code for text', () => {
    const result = useCase.execute('https://example.com');

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.svg).toContain('<svg');
    expect(result.svg).toContain('</svg>');
  });

  it('rejects empty input', () => {
    expect(useCase.execute('   ')).toEqual({ ok: false, error: 'empty' });
  });

  it('matches uqr output', () => {
    const text = 'Toolbox';
    const result = useCase.execute(text);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.svg).toBe(renderSVG(text));
  });
});
