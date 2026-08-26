import { BIP39_ENGLISH_WORDLIST } from './bip39-wordlist';

function hexToBits(hex: string): string {
  return hex
    .split('')
    .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
    .join('');
}

function bytesToHex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function checksumBits(entropyHex: string): Promise<string> {
  const entropyBytes = new Uint8Array(
    entropyHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)),
  );
  const digest = await crypto.subtle.digest('SHA-256', entropyBytes);
  const checksumLength = (entropyHex.length * 4) / 32;
  return hexToBits(bytesToHex(new Uint8Array(digest))).slice(0, checksumLength);
}

export class GenerateBip39MnemonicUseCase {
  async mnemonicFromEntropy(entropyHex: string): Promise<string> {
    const entropyBits = hexToBits(entropyHex);
    const bits = entropyBits + (await checksumBits(entropyHex));

    const words: string[] = [];
    for (let i = 0; i < bits.length; i += 11) {
      const index = parseInt(bits.slice(i, i + 11), 2);
      words.push(BIP39_ENGLISH_WORDLIST[index]);
    }
    return words.join(' ');
  }

  async generateRandomMnemonic(strengthBits: number): Promise<string> {
    const entropy = crypto.getRandomValues(new Uint8Array(strengthBits / 8));
    return this.mnemonicFromEntropy(bytesToHex(entropy));
  }

  async validateMnemonic(mnemonic: string): Promise<boolean> {
    const words = mnemonic.trim().split(/\s+/);
    if (![12, 15, 18, 21, 24].includes(words.length)) return false;

    const indices: number[] = [];
    for (const word of words) {
      const index = BIP39_ENGLISH_WORDLIST.indexOf(word);
      if (index === -1) return false;
      indices.push(index);
    }

    const bits = indices.map((i) => i.toString(2).padStart(11, '0')).join('');
    const checksumLength = bits.length / 33;
    const entropyBits = bits.slice(0, bits.length - checksumLength);
    const providedChecksum = bits.slice(bits.length - checksumLength);

    const entropyHex = entropyBits
      .match(/.{4}/g)!
      .map((nibble) => parseInt(nibble, 2).toString(16))
      .join('');

    const expectedChecksum = await checksumBits(entropyHex);
    return providedChecksum === expectedChecksum;
  }
}
