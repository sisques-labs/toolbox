import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { EmojiPickerPanel } from './emoji-picker-panel';

describe('EmojiPickerPanel', () => {
  it('lists results for a search query', () => {
    render(<EmojiPickerPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'fire' },
    });
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🔥/ })).toBeInTheDocument();
  });

  it('copies the emoji when clicked', () => {
    const onCopy = vi.fn();
    render(<EmojiPickerPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'fire' },
    });
    fireEvent.click(screen.getByRole('button', { name: /🔥/ }));
    expect(onCopy).toHaveBeenCalledWith('🔥', 'fire');
  });

  it('shows a no-matches message for an unknown query', () => {
    render(<EmojiPickerPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'not-a-real-emoji-name-xyz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
