import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { MarkdownHtmlPanel } from './markdown-html-panel';

describe('MarkdownHtmlPanel', () => {
  it('converts the default markdown input', () => {
    render(<MarkdownHtmlPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('markdown-html-output').textContent).toContain(
      '<h1>',
    );
  });

  it('reconverts as the input changes', () => {
    render(<MarkdownHtmlPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Markdown input'), {
      target: { value: '**bold**' },
    });
    expect(screen.getByTestId('markdown-html-output').textContent).toBe(
      '<p><strong>bold</strong></p>',
    );
  });
});
