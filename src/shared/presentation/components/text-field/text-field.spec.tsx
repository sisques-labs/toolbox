import { fireEvent, render, screen } from '@testing-library/react';
import { TextField } from './text-field';

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(<TextField label="Input text" value="hi" onChange={() => {}} />);
    expect(screen.getByLabelText('Input text')).toHaveValue('hi');
  });

  it('calls onChange when typed into', () => {
    const onChange = vi.fn();
    render(<TextField label="Input text" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'a' },
    });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('renders as a number input when type is number', () => {
    render(
      <TextField label="Count" value="5" onChange={() => {}} type="number" />,
    );
    expect(screen.getByLabelText('Count')).toHaveAttribute('type', 'number');
  });
});
