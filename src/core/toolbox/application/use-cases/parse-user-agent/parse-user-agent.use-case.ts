import { UAParser } from 'ua-parser-js';

export interface UserAgentInfo {
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: string;
  engineName: string;
}

export class ParseUserAgentUseCase {
  execute(userAgent: string): UserAgentInfo {
    const result = new UAParser(userAgent).getResult();

    return {
      browserName: result.browser.name ?? 'Unknown',
      browserVersion: result.browser.version ?? 'Unknown',
      osName: result.os.name ?? 'Unknown',
      osVersion: result.os.version ?? 'Unknown',
      deviceType: result.device.type ?? 'desktop',
      engineName: result.engine.name ?? 'Unknown',
    };
  }
}
