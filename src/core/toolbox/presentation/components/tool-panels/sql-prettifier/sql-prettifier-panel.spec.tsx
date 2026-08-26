import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { SqlPrettifierPanel } from './sql-prettifier-panel';

describe('SqlPrettifierPanel', () => {
  it('formats the default query onto multiple lines', () => {
    render(<SqlPrettifierPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('sql-output').textContent).toContain('SELECT');
    expect(screen.getByTestId('sql-output').textContent).toContain('\n');
  });

  it('reformats as the input changes', () => {
    render(<SqlPrettifierPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('SQL input'), {
      target: { value: 'select 1' },
    });
    expect(screen.getByTestId('sql-output').textContent).toBe('SELECT 1');
  });
});
