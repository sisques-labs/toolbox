export interface UrlParts {
  ok: boolean;
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  hash?: string;
  searchParams?: { key: string; value: string }[];
}

export class ParseUrlUseCase {
  execute(input: string): UrlParts {
    try {
      const url = new URL(input);
      return {
        ok: true,
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        hash: url.hash,
        searchParams: [...url.searchParams.entries()].map(([key, value]) => ({
          key,
          value,
        })),
      };
    } catch {
      return { ok: false };
    }
  }
}
