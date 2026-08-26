export const ToolId = {
  Case: 'case',
  Slug: 'slug',
  Lorem: 'lorem',
  Regex: 'regex',
  TextDiff: 'text-diff',
  Json: 'json',
  JsonDiff: 'json-diff',
  Yaml: 'yaml',
  Base64: 'base64',
  Url: 'url',
  Html: 'html',
  Jwt: 'jwt',
  Hash: 'hash',
  Uuid: 'uuid',
  Ulid: 'ulid',
  Password: 'password',
  Totp: 'totp',
  Crontab: 'crontab',
  Qr: 'qr',
  Timestamp: 'timestamp',
  Color: 'color',
  Base: 'base',
  Chmod: 'chmod',
  Subnet: 'subnet',
  HttpStatus: 'http-status',
} as const;

export type ToolId = (typeof ToolId)[keyof typeof ToolId];

export const ALL_TOOL_IDS = Object.values(ToolId);

export const ToolCategoryId = {
  Text: 'text',
  Data: 'data',
  Encoding: 'encoding',
  Generators: 'generators',
  Converters: 'converters',
  Network: 'network',
} as const;

export type ToolCategoryId =
  (typeof ToolCategoryId)[keyof typeof ToolCategoryId];
