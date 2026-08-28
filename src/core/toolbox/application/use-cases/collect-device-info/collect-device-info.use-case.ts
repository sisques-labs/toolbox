export interface DeviceInfoSnapshot {
  userAgent: string;
  platform: string;
  language: string;
  cookiesEnabled: boolean;
  onLine: boolean;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  pixelRatio: number;
  timezone: string;
}

export class CollectDeviceInfoUseCase {
  execute(): DeviceInfoSnapshot {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenWidth: screen.width,
      screenHeight: screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
}
