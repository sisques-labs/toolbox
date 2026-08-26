import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { SvgPlaceholderPanel } from './svg-placeholder-panel';

describe('SvgPlaceholderPanel', () => {
  it('renders an SVG preview for the default size', () => {
    render(<SvgPlaceholderPanel t={enToolbox} />);
    expect(screen.getByTestId('svg-placeholder-preview').innerHTML).toContain(
      '<svg',
    );
  });

  it('updates the preview when the width changes', () => {
    render(<SvgPlaceholderPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Width'), {
      target: { value: '500' },
    });
    expect(screen.getByTestId('svg-placeholder-preview').innerHTML).toContain(
      'width="500"',
    );
  });
});
