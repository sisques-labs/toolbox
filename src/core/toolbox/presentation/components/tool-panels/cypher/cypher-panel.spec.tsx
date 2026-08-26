import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { CypherPanel } from './cypher-panel';

describe('CypherPanel', () => {
  it('shifts the default text by the default shift', () => {
    render(<CypherPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('Khoor, Zruog!')).toBeInTheDocument();
  });

  it('updates the result when the shift changes', () => {
    render(<CypherPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Shift'), {
      target: { value: '1' },
    });
    expect(screen.getByText('Ifmmp, Xpsme!')).toBeInTheDocument();
  });

  it('applies ROT13 when the preset button is clicked', () => {
    render(<CypherPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'ROT13' }));
    expect(screen.getByText('Uryyb, Jbeyq!')).toBeInTheDocument();
  });
});
