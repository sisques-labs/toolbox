import { ConvertTomlJsonUseCase } from './convert-toml-json.use-case';

const TOML = [
  'title = "Toolbox"',
  'version = 1',
  '',
  '[server]',
  'host = "localhost"',
  'port = 8080',
  'debug = true',
  'tags = ["dev", "tools"]',
].join('\n');

const JSON_TEXT = JSON.stringify(
  {
    title: 'Toolbox',
    version: 1,
    server: {
      host: 'localhost',
      port: 8080,
      debug: true,
      tags: ['dev', 'tools'],
    },
  },
  null,
  2,
);

describe('ConvertTomlJsonUseCase', () => {
  const useCase = new ConvertTomlJsonUseCase();

  it('converts TOML with a table and mixed value types to JSON', () => {
    expect(useCase.tomlToJson(TOML)).toEqual({ ok: true, json: JSON_TEXT });
  });

  it('converts JSON back to TOML', () => {
    expect(useCase.jsonToToml(JSON_TEXT)).toEqual({ ok: true, toml: TOML });
  });

  it('rejects malformed TOML lines', () => {
    expect(useCase.tomlToJson('not a valid line').ok).toBe(false);
  });

  it('rejects malformed JSON', () => {
    expect(useCase.jsonToToml('not json').ok).toBe(false);
  });
});
