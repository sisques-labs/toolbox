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

  it('escapes background and text color attributes to avoid attribute injection', () => {
    const svg = useCase.execute({
      width: 100,
      height: 100,
      backgroundColor: '"/><script>alert(1)</script>',
      textColor: '" onload="alert(2)',
      text: 'hello',
    });

    expect(svg).not.toContain('<script>alert(1)</script>');
    expect(svg).not.toContain('" onload="alert(2)');
    expect(svg).toContain('&quot;/&gt;&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(svg).toContain('&quot; onload=&quot;alert(2)');
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
