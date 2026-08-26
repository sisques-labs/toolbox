export class GenerateIpv6UlaUseCase {
  execute(subnetId = '0000'): string {
    const globalId = crypto.getRandomValues(new Uint8Array(5));
    const hex = [...globalId].map((b) => b.toString(16).padStart(2, '0'));

    const prefix = `fd${hex[0]}`;
    const groupTwo = `${hex[1]}${hex[2]}`;
    const groupThree = `${hex[3]}${hex[4]}`;

    return `${prefix}:${groupTwo}:${groupThree}:${subnetId}::/64`;
  }
}
