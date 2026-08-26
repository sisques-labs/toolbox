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
  [ToolId.TextDiff]: (
    <>
      <path d="M4 5h7v14H4z" />
      <path d="M13 5h7v14h-7z" />
      <path d="M7 9h1M7 12h1M16 9h1M16 12h1M16 15h1" />
    </>
  ),
  [ToolId.Numeronym]: (
    <>
      <path d="M4 16V8l4 8V8" />
      <circle cx="13" cy="12" r="1" />
      <path d="M15 9h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
      <circle cx="20" cy="12" r="1" />
    </>
  ),
  [ToolId.TextStats]: (
    <>
      <path d="M4 6h16M4 12h10M4 18h13" />
      <path d="M18 15v6M15 18h6" />
    </>
  ),
  [ToolId.Nato]: (
    <>
      <path d="M5 19V9a3 3 0 0 1 6 0v10M5 14h6" />
      <path d="M15 19V9l4 6V9" />
    </>
  ),
  [ToolId.Json]: (
    <>
      <path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3" />
    </>
  ),
  [ToolId.JsonDiff]: (
    <>
      <path d="M4 6h7M4 12h5M4 18h7" />
      <path d="M14 6h6M14 12h6M14 18h6" />
      <path d="M12 4v16" />
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
  [ToolId.JsonCsv]: (
    <>
      <rect x="3" y="5" width="8" height="14" rx="1.5" />
      <path d="M7 8v8M14 8h6M14 12h6M14 16h4" />
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
  [ToolId.Totp]: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6M9 13h4" />
      <circle cx="15" cy="16" r="1" />
    </>
  ),
  [ToolId.Crontab]: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 11h16" />
      <path d="M8 15h2M12 15h2" />
    </>
  ),
  [ToolId.Qr]: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
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
  [ToolId.Base]: (
    <>
      <path d="M4 7h6v10H4zM14 7h6v10h-6z" />
      <path d="M10 12h4" />
    </>
  ),
  [ToolId.Chmod]: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0" />
      <path d="M9 16h6" />
    </>
  ),
  [ToolId.Iban]: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 14h4" />
    </>
  ),
  [ToolId.Roman]: (
    <>
      <path d="M5 6v12M9 6v12M9 6h3a3 3 0 0 1 0 12H9M17 6v12M19 6v12" />
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
  [ToolId.HttpStatus]: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9.5a3 3 0 1 1 3.5 3c-.7.4-1 .8-1 1.7" />
      <circle cx="12" cy="17.2" r="0.4" fill="currentColor" />
    </>
  ),
  [ToolId.IpAddress]: (
    <>
      <rect x="3" y="9" width="18" height="6" rx="1.5" />
      <path d="M7 12h.01M11 12h.01M15 12h.01" />
    </>
  ),
  [ToolId.Cypher]: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.25" />
    </>
  ),
  [ToolId.Bcrypt]: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h3a2 2 0 0 1 0 4H8V8zM8 12h3.5a2 2 0 0 1 0 4H8v-4z" />
    </>
  ),
  [ToolId.Hmac]: (
    <>
      <path d="M4 12h4l2-5 4 10 2-5h4" />
    </>
  ),
  [ToolId.PasswordStrength]: (
    <>
      <rect x="4" y="10" width="16" height="9" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M8 15h1M11.5 15h1M15 15h1" />
    </>
  ),
  [ToolId.Bip39]: (
    <>
      <path d="M4 6h16M4 11h16M4 16h10" />
      <circle cx="19" cy="16" r="2" />
    </>
  ),
  [ToolId.RsaKeypair]: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l9 9M16 16l2-2M19 19l2-2" />
    </>
  ),
  [ToolId.IpRange]: (
    <>
      <rect x="3" y="6" width="18" height="4" rx="1" />
      <rect x="3" y="14" width="18" height="4" rx="1" />
      <path d="M7 10v4M12 10v4M17 10v4" strokeDasharray="1.5 2" />
    </>
  ),
  [ToolId.MacGenerator]: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="1.5" />
      <path d="M6 11h.01M9.5 11h.01M13 11h.01M16.5 11h.01" />
    </>
  ),
  [ToolId.MacLookup]: (
    <>
      <circle cx="10" cy="10" r="6" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
    </>
  ),
  [ToolId.Ipv6Ula]: (
    <>
      <path d="M4 8h16M4 12h10M4 16h13" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  [ToolId.MathEvaluator]: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h3M8 13h5M8 17h3" />
      <path d="M15 15l3 3M18 15l-3 3" />
    </>
  ),
  [ToolId.Percentage]: (
    <>
      <line x1="5" y1="19" x2="19" y2="5" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </>
  ),
  [ToolId.Eta]: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  [ToolId.Temperature]: (
    <>
      <path d="M12 3a2 2 0 0 0-2 2v9.5a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" />
      <line x1="12" y1="8" x2="15" y2="8" />
    </>
  ),
  [ToolId.WifiQr]: (
    <>
      <path d="M5 9a10 10 0 0 1 14 0" />
      <path d="M8 12.5a6 6 0 0 1 8 0" />
      <circle cx="12" cy="17" r="1.5" />
    </>
  ),
  [ToolId.SvgPlaceholder]: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 15l4-4 3 3 4-5 7 6" />
    </>
  ),
  [ToolId.UrlParser]: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M2 12h20M12 4a14 14 0 0 1 0 16M12 4a14 14 0 0 0 0 16" />
    </>
  ),
  [ToolId.BasicAuth]: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
    </>
  ),
  [ToolId.MetaTags]: (
    <>
      <path d="M4 4h16v4H4z" />
      <path d="M4 12h10M4 16h7" />
    </>
  ),
  [ToolId.MimeTypes]: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v5h5" />
      <path d="M8 14h8" />
    </>
  ),
  [ToolId.Keycode]: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="1.5" />
      <path d="M7 11h.01M10.5 11h.01M14 11h.01M17.5 11h.01M8 14.5h8" />
    </>
  ),
  [ToolId.UserAgent]: (
    <>
      <rect x="4" y="3" width="16" height="12" rx="1.5" />
      <path d="M9 20h6M12 15v5" />
    </>
  ),
  [ToolId.Safelink]: (
    <>
      <path d="M9 17H7a5 5 0 0 1 0-10h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <path d="M9 12h5M12 9l3 3-3 3" />
    </>
  ),
  [ToolId.DeviceInfo]: (
    <>
      <rect x="4" y="3" width="16" height="14" rx="1.5" />
      <path d="M9 21h6M12 17v4" />
      <path d="M8 8h.01M8 11h.01" />
    </>
  ),
  [ToolId.RandomPort]: (
    <>
      <rect x="4" y="9" width="16" height="8" rx="1.5" />
      <circle cx="8" cy="13" r="1" />
      <path d="M12 13h5" />
    </>
  ),
  [ToolId.EmailNormalizer]: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  [ToolId.XmlFormatter]: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v5h5" />
      <path d="M8 13l2 2-2 2M14 13l-2 2 2 2" />
    </>
  ),
  [ToolId.SqlPrettifier]: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  [ToolId.DockerCompose]: (
    <>
      <rect x="3" y="10" width="4" height="4" />
      <rect x="8" y="10" width="4" height="4" />
      <rect x="8" y="5" width="4" height="4" />
      <rect x="13" y="10" width="4" height="4" />
      <path d="M2 16c1 2 4 3 10 3s9-1 10-3" />
    </>
  ),
  [ToolId.GitCheatsheet]: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M6 8.5V15.5M8.5 12H15.5M6 15.5c0-3 2-3.5 4-3.5" />
    </>
  ),
  [ToolId.RegexCheatsheet]: (
    <>
      <path d="M4 8h4l2 8 4-12 2 8h4" />
      <path d="M5 16h3M16 16h3" />
    </>
  ),
  [ToolId.TextBinary]: (
    <>
      <path d="M4 7h2v10H4zM7 7h1v10H7zM9 7h2v10H9zM12 7h1v10h-1zM14 7h2v10h-2zM17 7h1v10h-1zM19 7h1v10h-1z" />
    </>
  ),
  [ToolId.TextUnicode]: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 9h3M8 12h3M8 15h3M14 9h2v6h-2" />
    </>
  ),
  [ToolId.ListConverter]: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 5v6M4 5l-2 2M4 5l2 2" />
      <path d="M4 15v4M4 19h2M4 19H2" />
    </>
  ),
  [ToolId.MarkdownHtml]: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M6 15V9l3 3 3-3v6" />
      <path d="M15 9v6l3-3" />
    </>
  ),
  [ToolId.XmlJson]: (
    <>
      <path d="M4 6h7M4 12h5M4 18h7" />
      <path d="M14 6h6M14 12h6M14 18h6" />
      <path d="M12 4v16" />
    </>
  ),
  [ToolId.TomlJson]: (
    <>
      <path d="M4 6h7M4 12h5M4 18h7" />
      <path d="M14 6h6M14 12h6M14 18h6" />
      <path d="M12 4v16" />
      <circle cx="12" cy="4" r="1" />
    </>
  ),
  [ToolId.TomlYaml]: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v5h5" />
      <path d="M10 13l-2 2 2 2" />
      <path d="M14 13l2 2-2 2" />
      <circle cx="12" cy="9" r="1" />
    </>
  ),
  [ToolId.Base64File]: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v5h5" />
      <path d="M8 15h1.5a1.5 1.5 0 1 0 0-3H8v6" />
      <path d="M14 12h1.5a1.5 1.5 0 0 1 0 3H14v3" />
    </>
  ),
  [ToolId.StringObfuscator]: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="3" />
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
