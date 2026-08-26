export interface MacAddressOptions {
  locallyAdministered: boolean;
  multicast: boolean;
  separator: ':' | '-';
}

export class GenerateMacAddressUseCase {
  execute({
    locallyAdministered,
    multicast,
    separator,
  }: MacAddressOptions): string {
    const bytes = crypto.getRandomValues(new Uint8Array(6));

    if (locallyAdministered) bytes[0] |= 0b10;
    else bytes[0] &= ~0b10;

    if (multicast) bytes[0] |= 0b1;
    else bytes[0] &= ~0b1;

    return [...bytes]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(separator);
  }
}
