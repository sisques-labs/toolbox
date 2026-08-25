const dict = {
  tools: {
    heading: 'Tools',
    empty: 'No tools published here yet. Check back soon.',
  },
} as const;

export default dict;
export type HomeDict = typeof dict;
