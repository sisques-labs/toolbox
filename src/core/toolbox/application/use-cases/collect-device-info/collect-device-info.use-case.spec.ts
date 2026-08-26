import { CollectDeviceInfoUseCase } from './collect-device-info.use-case';

describe('CollectDeviceInfoUseCase', () => {
  const useCase = new CollectDeviceInfoUseCase();

  it('reads the current browser environment into a snapshot', () => {
    const snapshot = useCase.execute();

    expect(snapshot.userAgent).toBe(navigator.userAgent);
    expect(snapshot.language).toBe(navigator.language);
    expect(snapshot.platform).toBe(navigator.platform);
    expect(typeof snapshot.cookiesEnabled).toBe('boolean');
    expect(typeof snapshot.onLine).toBe('boolean');
    expect(typeof snapshot.screenWidth).toBe('number');
    expect(typeof snapshot.screenHeight).toBe('number');
    expect(typeof snapshot.viewportWidth).toBe('number');
    expect(typeof snapshot.viewportHeight).toBe('number');
    expect(typeof snapshot.pixelRatio).toBe('number');
    expect(typeof snapshot.timezone).toBe('string');
  });
});
