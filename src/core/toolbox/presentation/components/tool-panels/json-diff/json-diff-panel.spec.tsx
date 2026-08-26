import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { JsonDiffPanel } from './json-diff-panel';

describe('JsonDiffPanel', () => {
  it('shows differences for the default inputs', () => {
    render(<JsonDiffPanel t={enToolbox} />);
    expect(screen.getByText('2 differences')).toBeInTheDocument();
    expect(screen.getByText(/Added · tags/)).toBeInTheDocument();
    expect(screen.getByText(/Changed · version/)).toBeInTheDocument();
  });

  it('shows no differences when both sides match', () => {
    render(<JsonDiffPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('JSON A'), {
      target: { value: '{"a":1}' },
    });
    fireEvent.change(screen.getByLabelText('JSON B'), {
      target: { value: '{"a":1}' },
    });
    expect(screen.getByText('No differences')).toBeInTheDocument();
  });

  it('shows an error for invalid JSON', () => {
    render(<JsonDiffPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('JSON A'), {
      target: { value: '{' },
    });
    expect(screen.getByText('Left JSON is invalid')).toBeInTheDocument();
  });
});
