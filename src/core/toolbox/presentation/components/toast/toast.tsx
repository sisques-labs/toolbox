export function Toast({ text }: { text: string }) {
  const visible = text !== '';

  return (
    <div
      data-testid="toast"
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 right-6 z-50 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      {text}
    </div>
  );
}
