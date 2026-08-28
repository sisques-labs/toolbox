import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { HtmlPanel } from './html-panel';

describe('HtmlPanel', () => {
  it('escapes the default HTML input', () => {
    render(<HtmlPanel t={enToolbox} onCopy={() => {}} />);
    expect(
      screen.getByText(
        '&lt;div class=&quot;box&quot;&gt;Hello &amp; goodbye&lt;/div&gt;',
      ),
    ).toBeInTheDocument();
  });

  it('switches to unescape mode', () => {
    render(<HtmlPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Unescape' }));
    fireEvent.change(screen.getByLabelText('HTML entities'), {
      target: { value: '&lt;b&gt;hi&lt;/b&gt;' },
    });
    expect(screen.getByText('<b>hi</b>')).toBeInTheDocument();
  });

  it('copies the output', () => {
    const onCopy = vi.fn();
    render(<HtmlPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith(
      '&lt;div class=&quot;box&quot;&gt;Hello &amp; goodbye&lt;/div&gt;',
      'Output',
    );
  });
});
