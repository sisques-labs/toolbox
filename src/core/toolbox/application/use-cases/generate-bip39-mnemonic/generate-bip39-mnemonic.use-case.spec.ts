import { GenerateBip39MnemonicUseCase } from './generate-bip39-mnemonic.use-case';

describe('GenerateBip39MnemonicUseCase', () => {
  const useCase = new GenerateBip39MnemonicUseCase();
  const ZERO_ENTROPY = '00'.repeat(16);

  it('derives the well-known all-zero test vector mnemonic', async () => {
    const mnemonic = await useCase.mnemonicFromEntropy(ZERO_ENTROPY);
    expect(mnemonic).toBe(
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    );
  });

  it('validates the all-zero test vector mnemonic as correct', async () => {
    const mnemonic = await useCase.mnemonicFromEntropy(ZERO_ENTROPY);
    expect(await useCase.validateMnemonic(mnemonic)).toBe(true);
  });

  it('rejects a mnemonic whose checksum word was tampered with', async () => {
    const mnemonic = await useCase.mnemonicFromEntropy(ZERO_ENTROPY);
    const tampered = mnemonic.replace(/about$/, 'zoo');
    expect(await useCase.validateMnemonic(tampered)).toBe(false);
  });

  it('rejects a mnemonic containing a word outside the wordlist', async () => {
    const mnemonic = 'abandon '.repeat(11) + 'notaword';
    expect(await useCase.validateMnemonic(mnemonic.trim())).toBe(false);
  });

  it('generates a random 12-word mnemonic made only of wordlist entries', async () => {
    const mnemonic = await useCase.generateRandomMnemonic(128);
    const words = mnemonic.split(' ');
    expect(words).toHaveLength(12);
    expect(await useCase.validateMnemonic(mnemonic)).toBe(true);
  });

  it('generates a random 24-word mnemonic for 256 bits of entropy', async () => {
    const mnemonic = await useCase.generateRandomMnemonic(256);
    expect(mnemonic.split(' ')).toHaveLength(24);
  });
});
