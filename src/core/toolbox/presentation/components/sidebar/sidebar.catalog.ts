import { ToolCategoryId, ToolId } from '@/core/toolbox/domain/tool.types';

export const TOOL_CATALOG: { category: ToolCategoryId; tools: ToolId[] }[] = [
  {
    category: ToolCategoryId.Text,
    tools: [
      ToolId.Case,
      ToolId.Slug,
      ToolId.Lorem,
      ToolId.Regex,
      ToolId.TextDiff,
      ToolId.Numeronym,
      ToolId.TextStats,
      ToolId.Nato,
      ToolId.StringObfuscator,
      ToolId.AsciiDrawer,
    ],
  },
  {
    category: ToolCategoryId.Data,
    tools: [ToolId.Json, ToolId.JsonDiff, ToolId.Yaml, ToolId.JsonCsv],
  },
  {
    category: ToolCategoryId.Encoding,
    tools: [ToolId.Base64, ToolId.Url, ToolId.Html, ToolId.Jwt, ToolId.Hash],
  },
  {
    category: ToolCategoryId.Generators,
    tools: [
      ToolId.Uuid,
      ToolId.Ulid,
      ToolId.Password,
      ToolId.Totp,
      ToolId.Crontab,
      ToolId.Qr,
    ],
  },
  {
    category: ToolCategoryId.Converters,
    tools: [
      ToolId.Timestamp,
      ToolId.Color,
      ToolId.Base,
      ToolId.Chmod,
      ToolId.Iban,
      ToolId.Roman,
      ToolId.TextBinary,
      ToolId.TextUnicode,
      ToolId.ListConverter,
      ToolId.MarkdownHtml,
      ToolId.XmlJson,
      ToolId.TomlJson,
      ToolId.TomlYaml,
      ToolId.Base64File,
    ],
  },
  {
    category: ToolCategoryId.Network,
    tools: [
      ToolId.Subnet,
      ToolId.HttpStatus,
      ToolId.IpAddress,
      ToolId.IpRange,
      ToolId.MacGenerator,
      ToolId.MacLookup,
      ToolId.Ipv6Ula,
    ],
  },
  {
    category: ToolCategoryId.Math,
    tools: [ToolId.MathEvaluator, ToolId.Percentage, ToolId.Eta],
  },
  {
    category: ToolCategoryId.Measurement,
    tools: [ToolId.Temperature],
  },
  {
    category: ToolCategoryId.Images,
    tools: [ToolId.WifiQr, ToolId.SvgPlaceholder],
  },
  {
    category: ToolCategoryId.Web,
    tools: [
      ToolId.UrlParser,
      ToolId.BasicAuth,
      ToolId.MetaTags,
      ToolId.MimeTypes,
      ToolId.Keycode,
      ToolId.UserAgent,
      ToolId.Safelink,
      ToolId.DeviceInfo,
    ],
  },
  {
    category: ToolCategoryId.Development,
    tools: [
      ToolId.RandomPort,
      ToolId.EmailNormalizer,
      ToolId.XmlFormatter,
      ToolId.SqlPrettifier,
      ToolId.DockerCompose,
      ToolId.GitCheatsheet,
      ToolId.RegexCheatsheet,
    ],
  },
  {
    category: ToolCategoryId.Crypto,
    tools: [
      ToolId.Cypher,
      ToolId.Bcrypt,
      ToolId.Hmac,
      ToolId.PasswordStrength,
      ToolId.Bip39,
      ToolId.RsaKeypair,
    ],
  },
];
