import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { LoremPanel } from './lorem-panel';

describe('LoremPanel', () => {
  it('generates 3 paragraphs by default', () => {
    const { container } = render(
      <LoremPanel t={enToolbox} onCopy={() => {}} />,
    );
    const output = container.querySelector('[data-testid="lorem-output"]');
    expect(output?.textContent?.split('\n\n')).toHaveLength(3);
  });

  it('regenerates when Generate is clicked', () => {
    const { container } = render(
      <LoremPanel t={enToolbox} onCopy={() => {}} />,
    );
    const before = container.querySelector(
      '[data-testid="lorem-output"]',
    )?.textContent;

    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

    const after = container.querySelector(
      '[data-testid="lorem-output"]',
    )?.textContent;
    expect(after).not.toBe(before);
  });

  it('copies the generated text', () => {
    const onCopy = vi.fn();
    const { container } = render(<LoremPanel t={enToolbox} onCopy={onCopy} />);
    const text =
      container.querySelector('[data-testid="lorem-output"]')?.textContent ??
      '';

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(onCopy).toHaveBeenCalledWith(text, 'Lorem ipsum');
  });
});
