import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { JsonCsvPanel } from './json-csv-panel';

describe('JsonCsvPanel', () => {
  it('converts the default JSON input to CSV', () => {
    render(<JsonCsvPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText(/name,age/)).toBeInTheDocument();
  });

  it('switches direction and converts CSV to JSON', () => {
    render(<JsonCsvPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'CSV → JSON' }));
    fireEvent.change(screen.getByLabelText('CSV input'), {
      target: { value: 'name,age\nAna,30' },
    });
    expect(screen.getByText(/"name": "Ana"/)).toBeInTheDocument();
  });

  it('shows an error message for invalid input', () => {
    render(<JsonCsvPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: 'not json' },
    });
    expect(
      screen.getByText('Enter a JSON array of objects to convert to CSV'),
    ).toBeInTheDocument();
  });

  it('copies the output', () => {
    const onCopy = vi.fn();
    render(<JsonCsvPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalled();
  });
});
