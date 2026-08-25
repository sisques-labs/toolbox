import '@testing-library/jest-dom';

// Node's own experimental global `localStorage` shadows jsdom's window
// implementation on newer Node versions, leaving `window.localStorage`
// undefined — polyfill it in-memory for the test environment.
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

// The mock above is shared across every test in a file (setup runs once
// per file, not per test) — clear it so one test's persisted theme/locale
// can't leak into the next.
beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('lang');
});

// jsdom's navigator.language defaults to 'en-US', which would make every
// locale-detection test look English-first regardless of app logic — pin
// it to Spanish so tests reflect a non-English browser by default.
Object.defineProperty(window.navigator, 'language', {
  value: 'es-ES',
  configurable: true,
});
