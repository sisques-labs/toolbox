import { GenerateWifiQrUseCase } from './generate-wifi-qr.use-case';

describe('GenerateWifiQrUseCase', () => {
  const useCase = new GenerateWifiQrUseCase();

  it('builds a standard WIFI: payload for a WPA network', () => {
    const payload = useCase.buildPayload({
      ssid: 'MyNetwork',
      password: 'secret123',
      encryption: 'WPA',
      hidden: false,
    });
    expect(payload).toBe('WIFI:T:WPA;S:MyNetwork;P:secret123;H:false;;');
  });

  it('omits the password field for an open network', () => {
    const payload = useCase.buildPayload({
      ssid: 'OpenNet',
      password: '',
      encryption: 'nopass',
      hidden: false,
    });
    expect(payload).toBe('WIFI:T:nopass;S:OpenNet;P:;H:false;;');
  });

  it('escapes special characters in the SSID and password', () => {
    const payload = useCase.buildPayload({
      ssid: 'Weird;SSID:"test"',
      password: 'pa\\ss',
      encryption: 'WPA',
      hidden: true,
    });
    expect(payload).toBe(
      'WIFI:T:WPA;S:Weird\\;SSID\\:\\"test\\";P:pa\\\\ss;H:true;;',
    );
  });

  it('renders an SVG QR code for a non-empty SSID', () => {
    const result = useCase.execute({
      ssid: 'MyNetwork',
      password: 'secret123',
      encryption: 'WPA',
      hidden: false,
    });
    expect(result.ok).toBe(true);
    expect(result.svg).toContain('<svg');
  });

  it('rejects an empty SSID', () => {
    const result = useCase.execute({
      ssid: '',
      password: '',
      encryption: 'nopass',
      hidden: false,
    });
    expect(result.ok).toBe(false);
  });
});
