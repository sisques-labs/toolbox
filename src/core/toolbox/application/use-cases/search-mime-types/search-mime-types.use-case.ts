export interface MimeTypeEntry {
  extension: string;
  mimeType: string;
}

const MIME_TYPES: MimeTypeEntry[] = [
  { extension: '.aac', mimeType: 'audio/aac' },
  { extension: '.avi', mimeType: 'video/x-msvideo' },
  { extension: '.bin', mimeType: 'application/octet-stream' },
  { extension: '.bmp', mimeType: 'image/bmp' },
  { extension: '.css', mimeType: 'text/css' },
  { extension: '.csv', mimeType: 'text/csv' },
  { extension: '.doc', mimeType: 'application/msword' },
  {
    extension: '.docx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  { extension: '.gif', mimeType: 'image/gif' },
  { extension: '.gz', mimeType: 'application/gzip' },
  { extension: '.htm', mimeType: 'text/html' },
  { extension: '.html', mimeType: 'text/html' },
  { extension: '.ico', mimeType: 'image/vnd.microsoft.icon' },
  { extension: '.jpeg', mimeType: 'image/jpeg' },
  { extension: '.jpg', mimeType: 'image/jpeg' },
  { extension: '.js', mimeType: 'text/javascript' },
  { extension: '.json', mimeType: 'application/json' },
  { extension: '.md', mimeType: 'text/markdown' },
  { extension: '.mp3', mimeType: 'audio/mpeg' },
  { extension: '.mp4', mimeType: 'video/mp4' },
  { extension: '.mpeg', mimeType: 'video/mpeg' },
  { extension: '.oga', mimeType: 'audio/ogg' },
  { extension: '.ogv', mimeType: 'video/ogg' },
  { extension: '.otf', mimeType: 'font/otf' },
  { extension: '.pdf', mimeType: 'application/pdf' },
  { extension: '.png', mimeType: 'image/png' },
  { extension: '.ppt', mimeType: 'application/vnd.ms-powerpoint' },
  {
    extension: '.pptx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
  { extension: '.rar', mimeType: 'application/vnd.rar' },
  { extension: '.rtf', mimeType: 'application/rtf' },
  { extension: '.sh', mimeType: 'application/x-sh' },
  { extension: '.svg', mimeType: 'image/svg+xml' },
  { extension: '.tar', mimeType: 'application/x-tar' },
  { extension: '.ttf', mimeType: 'font/ttf' },
  { extension: '.txt', mimeType: 'text/plain' },
  { extension: '.wav', mimeType: 'audio/wav' },
  { extension: '.weba', mimeType: 'audio/webm' },
  { extension: '.webm', mimeType: 'video/webm' },
  { extension: '.webp', mimeType: 'image/webp' },
  { extension: '.woff', mimeType: 'font/woff' },
  { extension: '.woff2', mimeType: 'font/woff2' },
  { extension: '.xls', mimeType: 'application/vnd.ms-excel' },
  {
    extension: '.xlsx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  { extension: '.xml', mimeType: 'application/xml' },
  { extension: '.yaml', mimeType: 'application/yaml' },
  { extension: '.zip', mimeType: 'application/zip' },
];

export class SearchMimeTypesUseCase {
  execute(query: string): MimeTypeEntry[] {
    const q = query.trim().toLowerCase();
    if (!q) return MIME_TYPES;

    const normalized = q.startsWith('.') ? q : `.${q}`;
    return MIME_TYPES.filter(
      (entry) =>
        entry.extension === normalized ||
        entry.extension.includes(q) ||
        entry.mimeType.toLowerCase().includes(q),
    );
  }
}
