import type { ToolCategoryId, ToolId } from '@/core/toolbox/domain/tool.types';

export const TOOL_CATALOG: { category: ToolCategoryId; tools: ToolId[] }[] = [
  { category: 'text', tools: ['case', 'slug', 'lorem'] },
  { category: 'data', tools: ['json', 'yaml'] },
  { category: 'encoding', tools: ['base64', 'url', 'jwt', 'hash'] },
  { category: 'generators', tools: ['uuid', 'password'] },
  { category: 'converters', tools: ['timestamp'] },
  { category: 'network', tools: ['subnet'] },
];
