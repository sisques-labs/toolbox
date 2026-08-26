import { ConvertMarkdownHtmlUseCase } from './convert-markdown-html.use-case';

describe('ConvertMarkdownHtmlUseCase', () => {
  const useCase = new ConvertMarkdownHtmlUseCase();

  it('converts headings', () => {
    expect(useCase.execute('# Title\n## Subtitle')).toBe(
      '<h1>Title</h1>\n<h2>Subtitle</h2>',
    );
  });

  it('converts bold, italic and inline code', () => {
    expect(useCase.execute('**bold** and *italic* and `code`')).toBe(
      '<p><strong>bold</strong> and <em>italic</em> and <code>code</code></p>',
    );
  });

  it('converts links', () => {
    expect(useCase.execute('[toolbox](https://example.com)')).toBe(
      '<p><a href="https://example.com">toolbox</a></p>',
    );
  });

  it('converts an unordered list', () => {
    expect(useCase.execute('- one\n- two')).toBe(
      '<ul>\n<li>one</li>\n<li>two</li>\n</ul>',
    );
  });

  it('escapes raw HTML in the input', () => {
    expect(useCase.execute('<script>alert(1)</script>')).toBe(
      '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>',
    );
  });
});
