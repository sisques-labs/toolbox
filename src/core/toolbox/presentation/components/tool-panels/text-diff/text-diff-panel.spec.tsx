import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TextDiffPanel } from './text-diff-panel';

describe('TextDiffPanel', () => {
  it('shows added and removed lines for the default inputs', () => {
    render(<TextDiffPanel t={enToolbox} />);
    const result = screen.getByTestId('text-diff-result');
    expect(result).toHaveTextContent('−world');
    expect(result).toHaveTextContent('+there');
    expect(result).toHaveTextContent('hello');
  });

  it('updates when either side changes', () => {
    render(<TextDiffPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Text A'), {
      target: { value: 'same' },
    });
    fireEvent.change(screen.getByLabelText('Text B'), {
      target: { value: 'same' },
    });
    expect(screen.getByTestId('text-diff-result')).toHaveTextContent('same');
    expect(screen.getByTestId('text-diff-result')).not.toHaveTextContent('+');
  });
});
