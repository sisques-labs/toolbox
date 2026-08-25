import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { JwtPanel } from './jwt-panel';

describe('JwtPanel', () => {
  it('decodes the default sample token', () => {
    render(<JwtPanel t={enToolbox} />);
    expect(screen.getByText(/"alg": "HS256"/)).toBeInTheDocument();
    expect(screen.getByText(/"name": "John Doe"/)).toBeInTheDocument();
  });

  it('shows an error message for an invalid token', () => {
    render(<JwtPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('JWT token'), {
      target: { value: 'not-a-jwt' },
    });
    expect(
      screen.getByText('Not a valid JWT — expected 3 dot-separated parts.'),
    ).toBeInTheDocument();
  });
});
