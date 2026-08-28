import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge tone="success">Very strong</Badge>);
    expect(screen.getByText('Very strong')).toBeInTheDocument();
  });

  it.each(['danger', 'warning', 'primary', 'success'] as const)(
    'renders the %s tone without throwing',
    (tone) => {
      render(<Badge tone={tone}>Label</Badge>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    },
  );
});
