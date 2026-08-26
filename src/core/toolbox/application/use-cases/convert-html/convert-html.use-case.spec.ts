import { ConvertHtmlUseCase } from './convert-html.use-case';

describe('ConvertHtmlUseCase', () => {
  const useCase = new ConvertHtmlUseCase();

  it('escapes HTML special characters', () => {
    const result = useCase.execute(
      `<script>alert("x")</script> & 'y'`,
      'escape',
    );

    expect(result).toEqual({
      ok: true,
      text: '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;',
    });
  });

  it('unescapes HTML entities', () => {
    const result = useCase.execute(
      '&lt;div class=&quot;box&quot;&gt;A &amp; B&#39;s&lt;/div&gt;',
      'unescape',
    );

    expect(result).toEqual({
      ok: true,
      text: `<div class="box">A & B's</div>`,
    });
  });

  it('round-trips mixed content', () => {
    const original = `<p title="café">Ñoño & more</p>`;

    const escaped = useCase.execute(original, 'escape');
    const unescaped = useCase.execute(escaped.text, 'unescape');

    expect(unescaped).toEqual({ ok: true, text: original });
  });
});
