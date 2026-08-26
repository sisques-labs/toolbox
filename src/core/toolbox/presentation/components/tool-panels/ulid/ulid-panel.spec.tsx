import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { UlidPanel } from './ulid-panel';

describe('UlidPanel', () => {
  it('renders five ULIDs by default', () => {
    render(<UlidPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getAllByTestId('ulid-row')).toHaveLength(5);
  });

  it('regenerates when Generate is clicked', () => {
    render(<UlidPanel t={enToolbox} onCopy={() => {}} />);
    const before = screen
      .getAllByTestId('ulid-row')
      .map((el) => el.textContent);
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    const after = screen.getAllByTestId('ulid-row').map((el) => el.textContent);
    expect(after).not.toEqual(before);
  });

  it('copies all ULIDs', () => {
    const onCopy = vi.fn();
    render(<UlidPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy all' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onCopy.mock.calls[0][0].split('\n')).toHaveLength(5);
    expect(onCopy.mock.calls[0][1]).toBe('ULIDs');
  });
});
