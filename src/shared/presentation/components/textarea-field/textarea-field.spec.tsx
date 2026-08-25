import { fireEvent, render, screen } from '@testing-library/react';
import { TextareaField } from './textarea-field';

describe('TextareaField', () => {
  it('associates the label with the textarea', () => {
    render(<TextareaField label="JSON input" value="{}" onChange={() => {}} />);
    expect(screen.getByLabelText('JSON input')).toHaveValue('{}');
  });

  it('calls onChange when typed into', () => {
    const onChange = vi.fn();
    render(<TextareaField label="JSON input" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{"a":1}' },
    });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('applies the requested row count', () => {
    render(
      <TextareaField
        label="JSON input"
        value=""
        onChange={() => {}}
        rows={8}
      />,
    );
    expect(screen.getByLabelText('JSON input')).toHaveAttribute('rows', '8');
  });
});
