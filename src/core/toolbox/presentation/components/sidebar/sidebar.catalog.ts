import type { ToolCategoryId, ToolId } from '@/core/toolbox/domain/tool.types';

export const TOOL_CATALOG: { category: ToolCategoryId; tools: ToolId[] }[] = [
  { category: 'text', tools: ['case', 'slug', 'lorem', 'regex'] },
  { category: 'data', tools: ['json', 'yaml'] },
  { category: 'encoding', tools: ['base64', 'url', 'html', 'jwt', 'hash'] },
  { category: 'generators', tools: ['uuid', 'ulid', 'password', 'crontab'] },
  { category: 'converters', tools: ['timestamp', 'color'] },
  { category: 'network', tools: ['subnet'] },
];
