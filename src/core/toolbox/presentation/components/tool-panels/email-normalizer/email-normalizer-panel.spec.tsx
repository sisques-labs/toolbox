import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { EmailNormalizerPanel } from './email-normalizer-panel';

describe('EmailNormalizerPanel', () => {
  it('normalizes the default Gmail address', () => {
    render(<EmailNormalizerPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('johndoe@gmail.com')).toBeInTheDocument();
  });

  it('shows an error for an invalid address', () => {
    render(<EmailNormalizerPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'not-an-email' },
    });
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  });
});
