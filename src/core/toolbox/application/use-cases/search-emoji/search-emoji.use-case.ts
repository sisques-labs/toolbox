export interface EmojiEntry {
  emoji: string;
  name: string;
}

const ENTRIES: EmojiEntry[] = [
  { emoji: '😀', name: 'grinning face' },
  { emoji: '😂', name: 'face with tears of joy' },
  { emoji: '😊', name: 'smiling face' },
  { emoji: '😉', name: 'winking face' },
  { emoji: '😍', name: 'heart eyes' },
  { emoji: '😎', name: 'sunglasses' },
  { emoji: '🤔', name: 'thinking face' },
  { emoji: '😢', name: 'crying face' },
  { emoji: '😭', name: 'loudly crying face' },
  { emoji: '😡', name: 'angry face' },
  { emoji: '🥳', name: 'party face' },
  { emoji: '😴', name: 'sleeping face' },
  { emoji: '👍', name: 'thumbs up' },
  { emoji: '👎', name: 'thumbs down' },
  { emoji: '👏', name: 'clapping hands' },
  { emoji: '🙏', name: 'folded hands' },
  { emoji: '👋', name: 'waving hand' },
  { emoji: '✌️', name: 'victory hand' },
  { emoji: '👌', name: 'ok hand' },
  { emoji: '💪', name: 'flexed biceps' },
  { emoji: '❤️', name: 'red heart' },
  { emoji: '💔', name: 'broken heart' },
  { emoji: '🔥', name: 'fire' },
  { emoji: '⭐', name: 'star' },
  { emoji: '✨', name: 'sparkles' },
  { emoji: '🎉', name: 'party popper' },
  { emoji: '🎂', name: 'birthday cake' },
  { emoji: '🎁', name: 'gift' },
  { emoji: '💡', name: 'light bulb' },
  { emoji: '💯', name: 'hundred points' },
  { emoji: '✅', name: 'check mark' },
  { emoji: '❌', name: 'cross mark' },
  { emoji: '⚠️', name: 'warning' },
  { emoji: '🚀', name: 'rocket' },
  { emoji: '🐛', name: 'bug' },
  { emoji: '🐞', name: 'ladybug' },
  { emoji: '🐶', name: 'dog face' },
  { emoji: '🐱', name: 'cat face' },
  { emoji: '🦁', name: 'lion' },
  { emoji: '🌍', name: 'globe' },
  { emoji: '🌞', name: 'sun' },
  { emoji: '🌙', name: 'moon' },
  { emoji: '☀️', name: 'sunny' },
  { emoji: '☁️', name: 'cloud' },
  { emoji: '☕', name: 'coffee' },
  { emoji: '🍕', name: 'pizza' },
  { emoji: '🍔', name: 'hamburger' },
  { emoji: '🍎', name: 'red apple' },
  { emoji: '💻', name: 'laptop' },
  { emoji: '📱', name: 'mobile phone' },
  { emoji: '📧', name: 'email' },
  { emoji: '🔒', name: 'locked' },
  { emoji: '🔑', name: 'key' },
  { emoji: '📌', name: 'pushpin' },
  { emoji: '📎', name: 'paperclip' },
  { emoji: '🕐', name: 'clock' },
  { emoji: '🏠', name: 'house' },
  { emoji: '🚗', name: 'car' },
  { emoji: '✈️', name: 'airplane' },
  { emoji: '🎵', name: 'musical note' },
  { emoji: '📷', name: 'camera' },
];

export class SearchEmojiUseCase {
  execute(query: string): EmojiEntry[] {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;

    return ENTRIES.filter((entry) => entry.name.toLowerCase().includes(q));
  }
}
