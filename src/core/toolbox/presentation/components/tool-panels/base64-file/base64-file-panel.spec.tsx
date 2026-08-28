import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { Base64FilePanel } from './base64-file-panel';

describe('Base64FilePanel', () => {
  it('reads a chosen file and shows its Base64 payload', async () => {
    render(<Base64FilePanel t={enToolbox} onCopy={() => {}} />);
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const input = screen.getByTestId('base64-file-input') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(screen.getByTestId('base64-file-output').textContent).toContain(
        'aGVsbG8=',
      ),
    );
    expect(screen.getByText('hello.txt')).toBeInTheDocument();
  });

  it('downloads via an object URL built from the validated data URL parts, never the raw pasted text', () => {
    const createObjectURL = vi.fn((_blob: Blob) => 'blob:mock-url');
    const revokeObjectURL = vi.fn();
    vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL });

    render(<Base64FilePanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Base64 data URL'), {
      target: { value: 'data:text/plain;base64,aGVsbG8=' },
    });

    let capturedHref = '';
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        capturedHref = this.href;
      });

    fireEvent.click(screen.getByText('Download'));

    expect(createObjectURL).toHaveBeenCalledOnce();
    const blob = createObjectURL.mock.calls[0][0] as Blob;
    expect(blob.type).toBe('text/plain');
    expect(capturedHref).toBe('blob:mock-url');
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');

    clickSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('shows an error for an invalid pasted data URL', () => {
    render(<Base64FilePanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Base64 data URL'), {
      target: { value: 'not a data url' },
    });
    expect(
      screen.getByText('Enter a valid data:*;base64,... URL'),
    ).toBeInTheDocument();
  });
});
