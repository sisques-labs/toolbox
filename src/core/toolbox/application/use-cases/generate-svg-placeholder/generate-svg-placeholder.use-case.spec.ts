import { GenerateSvgPlaceholderUseCase } from './generate-svg-placeholder.use-case';

describe('GenerateSvgPlaceholderUseCase', () => {
  const useCase = new GenerateSvgPlaceholderUseCase();

  it('builds an SVG with the requested dimensions and colors', () => {
    const svg = useCase.execute({
      width: 400,
      height: 300,
      backgroundColor: '#cccccc',
      textColor: '#333333',
      text: '400x300',
    });

    expect(svg).toContain('width="400"');
    expect(svg).toContain('height="300"');
    expect(svg).toContain('fill="#cccccc"');
    expect(svg).toContain('fill="#333333"');
    expect(svg).toContain('400x300');
  });

  it('escapes text content to avoid breaking the markup', () => {
    const svg = useCase.execute({
      width: 100,
      height: 100,
      backgroundColor: '#fff',
      textColor: '#000',
      text: '<script>&"\'',
    });

    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;&amp;&quot;&#39;');
  });

  it('defaults the label to the dimensions when text is empty', () => {
    const svg = useCase.execute({
      width: 200,
      height: 150,
      backgroundColor: '#fff',
      textColor: '#000',
      text: '',
    });
    expect(svg).toContain('200×150');
  });
});
