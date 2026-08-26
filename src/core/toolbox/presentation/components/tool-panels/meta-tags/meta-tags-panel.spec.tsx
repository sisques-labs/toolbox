import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { MetaTagsPanel } from './meta-tags-panel';

describe('MetaTagsPanel', () => {
  it('shows the generated tags for the default title', () => {
    render(<MetaTagsPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('meta-tags-output').textContent).toContain(
      '<title>',
    );
  });

  it('updates the output as the title changes', () => {
    render(<MetaTagsPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Custom Title' },
    });
    expect(screen.getByTestId('meta-tags-output').textContent).toContain(
      '<title>Custom Title</title>',
    );
  });
});
