import { ConvertDockerRunUseCase } from './convert-docker-run.use-case';

describe('ConvertDockerRunUseCase', () => {
  const useCase = new ConvertDockerRunUseCase();

  it('converts a docker run command with ports, env and volumes', () => {
    const result = useCase.execute(
      'docker run -d --name web -p 8080:80 -e NODE_ENV=production -v ./data:/data --restart unless-stopped nginx:latest',
    );
    expect(result).toEqual({
      ok: true,
      compose: [
        'services:',
        '  web:',
        '    image: nginx:latest',
        '    restart: unless-stopped',
        '    ports:',
        '      - "8080:80"',
        '    environment:',
        '      - NODE_ENV=production',
        '    volumes:',
        '      - ./data:/data',
      ].join('\n'),
    });
  });

  it('falls back to a generic service name and includes a trailing command', () => {
    const result = useCase.execute('docker run alpine echo hello world');
    expect(result).toEqual({
      ok: true,
      compose: [
        'services:',
        '  app:',
        '    image: alpine',
        '    command: ["echo", "hello", "world"]',
      ].join('\n'),
    });
  });

  it('rejects a command with no image', () => {
    expect(useCase.execute('docker run -d').ok).toBe(false);
  });

  it('rejects empty input', () => {
    expect(useCase.execute('').ok).toBe(false);
  });
});
