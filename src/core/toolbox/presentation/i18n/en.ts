const dict = {
  search: { placeholder: 'Search tools...' },
  categories: {
    text: 'Text',
    data: 'Data',
    encoding: 'Encoding & security',
    generators: 'Generators',
    converters: 'Converters',
    network: 'Network',
  },
  tools: {
    case: {
      label: 'Case converter',
      description:
        'Convert text between camelCase, snake_case, kebab-case and more',
    },
    slug: {
      label: 'Slug generator',
      description: 'Turn any text into a URL-friendly slug',
    },
    lorem: {
      label: 'Lorem ipsum',
      description: 'Generate placeholder paragraphs',
    },
    json: {
      label: 'JSON formatter',
      description: 'Validate, format and minify JSON',
    },
    yaml: {
      label: 'YAML ↔ JSON',
      description: 'Convert between YAML and JSON',
    },
    base64: {
      label: 'Base64',
      description: 'Encode and decode Base64 strings',
    },
    jwt: {
      label: 'JWT decoder',
      description: 'Inspect the header and payload of a JSON Web Token',
    },
    hash: {
      label: 'Hash generator',
      description: 'Generate MD5 and SHA hashes from text',
    },
    uuid: {
      label: 'UUID generator',
      description: 'Generate random v4 UUIDs',
    },
    password: {
      label: 'Password generator',
      description: 'Create strong random passwords',
    },
    timestamp: {
      label: 'Timestamp converter',
      description: 'Convert between Unix time and readable dates',
    },
    subnet: {
      label: 'IP subnet calculator',
      description: 'Get network, broadcast and host range from a CIDR',
    },
  },
  actions: {
    copy: 'Copy',
    copyAll: 'Copy all',
    generate: 'Generate',
    format: 'Format',
    minify: 'Minify',
    encode: 'Encode',
    decode: 'Decode',
    now: 'Now',
  },
  fields: {
    inputText: 'Input text',
    paragraphs: 'Paragraphs',
    count: 'Count',
    length: 'Length',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    numbers: 'Numbers',
    symbols: 'Symbols',
    unixTimestamp: 'Unix timestamp (seconds)',
    dateTimeLocal: 'Date & time (local)',
    cidr: 'CIDR (e.g. 192.168.1.0/24)',
    indent: 'Indent',
    jsonInput: 'JSON input',
    yamlInput: 'YAML input',
    jwtToken: 'JWT token',
  },
  labels: {
    plainText: 'Plain text',
    base64Text: 'Base64 text',
    header: 'HEADER',
    payload: 'PAYLOAD',
    signature: 'SIGNATURE',
    iso: 'ISO 8601',
    utc: 'UTC',
    relative: 'Relative',
    networkAddress: 'Network address',
    broadcastAddress: 'Broadcast address',
    subnetMask: 'Subnet mask',
    hostRange: 'Usable host range',
    totalAddresses: 'Total addresses',
    usableHosts: 'Usable hosts',
  },
  strength: {
    weak: 'Weak',
    fair: 'Fair',
    strong: 'Strong',
    veryStrong: 'Very strong',
  },
  errors: {
    invalidCidr: 'Enter a valid CIDR, e.g. 10.0.0.0/16',
    invalidJwt: 'Not a valid JWT — expected 3 dot-separated parts.',
    undecodableJwt: 'Could not decode this token.',
  },
  copiedSuffix: ' copied',
} as const;

export default dict;
export type ToolboxDict = typeof dict;
