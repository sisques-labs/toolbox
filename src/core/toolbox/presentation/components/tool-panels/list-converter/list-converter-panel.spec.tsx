import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { ListConverterPanel } from './list-converter-panel';

describe('ListConverterPanel', () => {
  it('sorts the default list ascending by default', () => {
    render(<ListConverterPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('list-output').textContent).toBe(
      'apple\nbanana\ncherry',
    );
  });

  it('applies a prefix as it is typed', () => {
    render(<ListConverterPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Prefix'), {
      target: { value: '- ' },
    });
    expect(screen.getByTestId('list-output').textContent).toBe(
      '- apple\n- banana\n- cherry',
    );
  });
});
