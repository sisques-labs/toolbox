import { ConvertTomlJsonUseCase } from '@/core/toolbox/application/use-cases/convert-toml-json/convert-toml-json.use-case';
import { ConvertYamlUseCase } from '@/core/toolbox/application/use-cases/convert-yaml/convert-yaml.use-case';

export interface TomlYamlResult {
  ok: boolean;
  yaml?: string;
}

export interface YamlTomlResult {
  ok: boolean;
  toml?: string;
}

const tomlJsonUseCase = new ConvertTomlJsonUseCase();
const yamlUseCase = new ConvertYamlUseCase();

export class ConvertTomlYamlUseCase {
  tomlToYaml(toml: string): TomlYamlResult {
    const json = tomlJsonUseCase.tomlToJson(toml);
    if (!json.ok) return { ok: false };
    return { ok: true, yaml: yamlUseCase.execute(json.json!, 'jsonToYaml') };
  }

  yamlToToml(yaml: string): YamlTomlResult {
    const json = yamlUseCase.execute(yaml, 'yamlToJson');
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return { ok: false };
    }
    if (typeof parsed !== 'object' || parsed === null) return { ok: false };

    const toml = tomlJsonUseCase.jsonToToml(json);
    if (!toml.ok) return { ok: false };
    return { ok: true, toml: toml.toml };
  }
}
