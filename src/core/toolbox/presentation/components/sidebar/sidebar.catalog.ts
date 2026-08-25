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
    ],
  },
  {
    category: ToolCategoryId.Data,
    tools: [ToolId.Json, ToolId.JsonDiff, ToolId.Yaml],
  },
  {
    category: ToolCategoryId.Encoding,
    tools: [ToolId.Base64, ToolId.Url, ToolId.Html, ToolId.Jwt, ToolId.Hash],
  },
  {
    category: ToolCategoryId.Generators,
    tools: [ToolId.Uuid, ToolId.Ulid, ToolId.Password, ToolId.Crontab],
  },
  {
    category: ToolCategoryId.Converters,
    tools: [ToolId.Timestamp, ToolId.Color, ToolId.Base, ToolId.Chmod],
  },
  { category: ToolCategoryId.Network, tools: [ToolId.Subnet] },
];
