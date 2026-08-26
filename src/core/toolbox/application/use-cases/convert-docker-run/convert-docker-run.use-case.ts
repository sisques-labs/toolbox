export interface DockerRunConversionResult {
  ok: boolean;
  compose?: string;
}

const VALUE_FLAGS: Record<string, string> = {
  '-p': 'port',
  '--publish': 'port',
  '-e': 'env',
  '--env': 'env',
  '-v': 'volume',
  '--volume': 'volume',
  '--name': 'name',
  '--restart': 'restart',
};

const BOOLEAN_FLAGS = new Set(['-d', '--detach', '--rm', '-i', '-t', '-it']);

function tokenize(command: string): string[] {
  const tokens: string[] = [];
  const pattern = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(command))) {
    tokens.push(match[1] ?? match[2] ?? match[3]);
  }
  return tokens;
}

export class ConvertDockerRunUseCase {
  execute(command: string): DockerRunConversionResult {
    let tokens = tokenize(command.trim());
    if (tokens.length === 0) return { ok: false };

    if (tokens[0] === 'docker') tokens = tokens.slice(1);
    if (tokens[0] === 'run') tokens = tokens.slice(1);

    const ports: string[] = [];
    const environment: string[] = [];
    const volumes: string[] = [];
    let name = '';
    let restart = '';
    let image = '';
    let i = 0;

    for (; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === '--') {
        i++;
        break;
      }
      if (BOOLEAN_FLAGS.has(token)) continue;

      const kind = VALUE_FLAGS[token];
      if (kind) {
        const value = tokens[++i] ?? '';
        if (kind === 'port') ports.push(value);
        else if (kind === 'env') environment.push(value);
        else if (kind === 'volume') volumes.push(value);
        else if (kind === 'name') name = value;
        else if (kind === 'restart') restart = value;
        continue;
      }

      if (token.startsWith('-')) continue;

      image = token;
      i++;
      break;
    }

    if (!image) return { ok: false };

    const commandArgs = tokens.slice(i);
    const serviceName = name || 'app';
    const lines = ['services:', `  ${serviceName}:`, `    image: ${image}`];

    if (restart) lines.push(`    restart: ${restart}`);
    if (ports.length) {
      lines.push('    ports:');
      for (const p of ports) lines.push(`      - "${p}"`);
    }
    if (environment.length) {
      lines.push('    environment:');
      for (const e of environment) lines.push(`      - ${e}`);
    }
    if (volumes.length) {
      lines.push('    volumes:');
      for (const v of volumes) lines.push(`      - ${v}`);
    }
    if (commandArgs.length) {
      lines.push(
        `    command: [${commandArgs.map((a) => `"${a}"`).join(', ')}]`,
      );
    }

    return { ok: true, compose: lines.join('\n') };
  }
}
