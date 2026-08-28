import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { MathEvaluatorPanel } from './math-evaluator-panel';

describe('MathEvaluatorPanel', () => {
  it('evaluates the default expression', () => {
    render(<MathEvaluatorPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('14')).toBeInTheDocument();
  });

  it('re-evaluates as the expression changes', () => {
    render(<MathEvaluatorPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(
      screen.getByLabelText('Expression (e.g. sqrt(16) + 2^3)'),
      { target: { value: 'sqrt(16)' } },
    );
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows an error for an invalid expression', () => {
    render(<MathEvaluatorPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(
      screen.getByLabelText('Expression (e.g. sqrt(16) + 2^3)'),
      { target: { value: '2 + * 3' } },
    );
    expect(
      screen.getByText('Enter a valid math expression'),
    ).toBeInTheDocument();
  });
});
