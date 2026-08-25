import { ToolId } from '@/core/toolbox/domain/tool.types';

const ICON_PATHS: Record<ToolId, React.ReactNode> = {
  [ToolId.Case]: (
    <>
      <path d="M4 16l3-8 3 8M5 13h4" />
      <path d="M14 16v-5a2 2 0 1 1 4 0v5M14 13h4" />
    </>
  ),
  [ToolId.Slug]: (
    <>
      <path d="M9 17H7a5 5 0 0 1 0-10h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  [ToolId.Lorem]: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="18" y2="18" />
    </>
  ),
  [ToolId.Regex]: (
    <>
      <path d="M4 8h4l2 8 4-12 2 8h4" />
      <path d="M5 16h3M16 16h3" />
    </>
  ),
  [ToolId.Json]: (
    <>
      <path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3" />
    </>
  ),
  [ToolId.Yaml]: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v5h5" />
      <path d="M10 13l-2 2 2 2" />
      <path d="M14 13l2 2-2 2" />
    </>
  ),
  [ToolId.Base64]: (
    <>
      <rect x="3" y="6" width="6" height="4" rx="1" />
      <rect x="3" y="14" width="6" height="4" rx="1" />
      <line x1="15" y1="6" x2="15" y2="10" />
      <line x1="15" y1="14" x2="15" y2="18" />
      <line x1="19" y1="6" x2="19" y2="10" />
      <line x1="19" y1="14" x2="19" y2="18" />
    </>
  ),
  [ToolId.Url]: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M2 12h20" />
      <path d="M12 2a14 14 0 0 1 0 20" />
      <path d="M12 2a14 14 0 0 0 0 20" />
    </>
  ),
  [ToolId.Html]: (
    <>
      <path d="M8 4 4 12l4 8" />
      <path d="M16 4l4 8-4 8" />
      <path d="M14 6l-4 12" />
    </>
  ),
  [ToolId.Jwt]: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.5 12.5 20 3M17 6l2 2M14 9l2 2" />
    </>
  ),
  [ToolId.Hash]: (
    <>
      <path d="M12 3a7 7 0 0 0-7 7v2a9 9 0 0 0 3 6.7" />
      <path d="M12 3a7 7 0 0 1 7 7v3" />
      <path d="M8 12a4 4 0 0 1 8 0v2a10 10 0 0 1-1.5 5.5" />
      <path d="M12 12v3a6 6 0 0 1-1 3.3" />
    </>
  ),
  [ToolId.Uuid]: (
    <>
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="10" y1="4" x2="8" y2="20" />
      <line x1="16" y1="4" x2="14" y2="20" />
    </>
  ),
  [ToolId.Ulid]: (
    <>
      <path d="M4 7h16M4 12h16M4 17h10" />
      <circle cx="18" cy="17" r="2" />
    </>
  ),
  [ToolId.Password]: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    </>
  ),
  [ToolId.Crontab]: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 11h16" />
      <path d="M8 15h2M12 15h2" />
    </>
  ),
  [ToolId.Timestamp]: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  [ToolId.Color]: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </>
  ),
  [ToolId.Subnet]: (
    <>
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <rect x="3" y="17" width="6" height="4" rx="1" />
      <rect x="15" y="17" width="6" height="4" rx="1" />
      <path d="M12 7v5M12 12l-6 5M12 12l6 5" />
    </>
  ),
};

export function ToolIcon({
  id,
  className = 'h-4 w-4',
}: {
  id: ToolId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[id]}
    </svg>
  );
}
