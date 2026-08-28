import { GenerateMetaTagsUseCase } from './generate-meta-tags.use-case';

describe('GenerateMetaTagsUseCase', () => {
  const useCase = new GenerateMetaTagsUseCase();

  it('generates title, description, Open Graph and Twitter card tags', () => {
    const html = useCase.execute({
      title: 'My Page',
      description: 'A short description',
      imageUrl: 'https://example.com/og.png',
      url: 'https://example.com',
    });

    expect(html).toContain('<title>My Page</title>');
    expect(html).toContain(
      '<meta name="description" content="A short description" />',
    );
    expect(html).toContain('<meta property="og:title" content="My Page" />');
    expect(html).toContain(
      '<meta property="og:image" content="https://example.com/og.png" />',
    );
    expect(html).toContain(
      '<meta name="twitter:card" content="summary_large_image" />',
    );
  });

  it('escapes special characters in the values', () => {
    const html = useCase.execute({
      title: 'A "quoted" <title>',
      description: '',
      imageUrl: '',
      url: '',
    });
    expect(html).toContain('<title>A &quot;quoted&quot; &lt;title&gt;</title>');
  });

  it('omits tags for empty fields', () => {
    const html = useCase.execute({
      title: 'Only title',
      description: '',
      imageUrl: '',
      url: '',
    });
    expect(html).not.toContain('og:image');
    expect(html).not.toContain('name="description"');
  });
});
