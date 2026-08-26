import { ALL_TOOL_IDS, ToolCategoryId, ToolId } from './tool.types';

describe('ToolId const map', () => {
  it('exposes every tool id as a unique string value', () => {
    expect(new Set(ALL_TOOL_IDS).size).toBe(ALL_TOOL_IDS.length);
    expect(ALL_TOOL_IDS).toContain(ToolId.Case);
    expect(ALL_TOOL_IDS).toContain(ToolId.Subnet);
  });

  it('keeps category ids as a closed set', () => {
    expect(Object.values(ToolCategoryId)).toEqual([
      ToolCategoryId.Text,
      ToolCategoryId.Data,
      ToolCategoryId.Encoding,
      ToolCategoryId.Generators,
      ToolCategoryId.Converters,
      ToolCategoryId.Network,
    ]);
  });
});
