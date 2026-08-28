import { fireEvent, render, screen } from '@testing-library/react';
import { DownloadButton } from './download-button';

describe('DownloadButton', () => {
  const createObjectURL = vi.fn((_blob: Blob) => 'blob:mock-url');
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
    vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders the given label', () => {
    render(
      <DownloadButton
        content="{}"
        baseName="json"
        extension="json"
        label="Download"
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Download' }),
    ).toBeInTheDocument();
  });

  it('creates a blob with the given content and mime type when clicked', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(
      <DownloadButton
        content='{"a":1}'
        baseName="json"
        extension="json"
        mimeType="application/json"
        label="Download"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(createObjectURL).toHaveBeenCalledOnce();
    const blob = createObjectURL.mock.calls[0][0] as Blob;
    expect(blob.type).toBe('application/json');
  });

  it('names the file using baseName, a timestamp, and the extension', () => {
    let downloadedName = '';
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      downloadedName = this.download;
    });
    render(
      <DownloadButton
        content="name: toolbox"
        baseName="yaml"
        extension="yaml"
        label="Download"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(downloadedName).toMatch(/^yaml-\d{8}-\d{6}\.yaml$/);
  });

  it('revokes the object URL after triggering the download', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(
      <DownloadButton
        content="{}"
        baseName="json"
        extension="json"
        label="Download"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('does nothing when disabled', () => {
    render(
      <DownloadButton
        content="{}"
        baseName="json"
        extension="json"
        label="Download"
        disabled
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(createObjectURL).not.toHaveBeenCalled();
  });
});
