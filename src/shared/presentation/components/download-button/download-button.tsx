import { Button } from '@/shared/presentation/components/button/button';

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v11m0 0-4-4m4 4 4-4" />
      <path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
    </svg>
  );
}

function buildTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `${date}-${time}`;
}

export function DownloadButton({
  content,
  baseName,
  extension,
  mimeType = 'text/plain',
  label,
  disabled = false,
}: {
  content: string;
  baseName: string;
  extension: string;
  mimeType?: string;
  label: string;
  disabled?: boolean;
}) {
  function handleDownload() {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${baseName}-${buildTimestamp()}.${extension}`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDownload}
      disabled={disabled}
    >
      <DownloadIcon />
      {label}
    </Button>
  );
}
