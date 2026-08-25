import type { ToolboxDict } from './en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

type ToolboxDictTranslated = WidenStringLiterals<ToolboxDict>;

const dict = {
  search: { placeholder: 'Buscar herramientas...' },
  categories: {
    text: 'Texto',
    data: 'Datos',
    encoding: 'Codificación y seguridad',
    generators: 'Generadores',
    converters: 'Conversores',
    network: 'Red',
  },
  tools: {
    case: {
      label: 'Conversor de mayúsculas',
      description:
        'Convierte texto entre camelCase, snake_case, kebab-case y más',
    },
    slug: {
      label: 'Generador de slugs',
      description: 'Convierte cualquier texto en un slug para URLs',
    },
    lorem: {
      label: 'Lorem ipsum',
      description: 'Genera párrafos de relleno',
    },
    regex: {
      label: 'Probador de regex',
      description: 'Prueba expresiones regulares contra un texto de ejemplo',
    },
    json: {
      label: 'Formateador JSON',
      description: 'Valida, formatea y minifica JSON',
    },
    yaml: {
      label: 'YAML ↔ JSON',
      description: 'Convierte entre YAML y JSON',
    },
    base64: {
      label: 'Base64',
      description: 'Codifica y decodifica cadenas Base64',
    },
    url: {
      label: 'Codificador URL',
      description:
        'Codifica y decodifica cadenas en formato URL (percent-encoding)',
    },
    html: {
      label: 'Entidades HTML',
      description: 'Escapa y desescapa caracteres especiales de HTML',
    },
    jwt: {
      label: 'Decodificador JWT',
      description: 'Inspecciona la cabecera y el payload de un JSON Web Token',
    },
    hash: {
      label: 'Generador de hash',
      description: 'Genera hashes MD5 y SHA a partir de texto',
    },
    uuid: {
      label: 'Generador de UUID',
      description: 'Genera UUID v4 aleatorios',
    },
    ulid: {
      label: 'Generador de ULID',
      description: 'Genera ULID ordenables lexicográficamente',
    },
    password: {
      label: 'Generador de contraseñas',
      description: 'Crea contraseñas aleatorias seguras',
    },
    crontab: {
      label: 'Generador de crontab',
      description: 'Construye y explica expresiones de cron',
    },
    timestamp: {
      label: 'Conversor de timestamp',
      description: 'Convierte entre tiempo Unix y fechas legibles',
    },
    color: {
      label: 'Conversor de color',
      description: 'Convierte colores entre hex, RGB y HSL',
    },
    subnet: {
      label: 'Calculadora de subred',
      description: 'Obtén red, broadcast y rango de hosts a partir de un CIDR',
    },
  },
  actions: {
    copy: 'Copiar',
    copyAll: 'Copiar todo',
    generate: 'Generar',
    format: 'Formatear',
    minify: 'Minificar',
    encode: 'Codificar',
    decode: 'Decodificar',
    escape: 'Escapar',
    unescape: 'Desescapar',
    now: 'Ahora',
  },
  fields: {
    inputText: 'Texto de entrada',
    paragraphs: 'Párrafos',
    count: 'Cantidad',
    length: 'Longitud',
    uppercase: 'Mayúsculas',
    lowercase: 'Minúsculas',
    numbers: 'Números',
    symbols: 'Símbolos',
    unixTimestamp: 'Timestamp Unix (segundos)',
    dateTimeLocal: 'Fecha y hora (local)',
    cidr: 'CIDR (ej. 192.168.1.0/24)',
    indent: 'Sangría',
    jsonInput: 'Entrada JSON',
    yamlInput: 'Entrada YAML',
    jwtToken: 'Token JWT',
    colorInput: 'Color',
    preset: 'Preajuste',
    minute: 'Minuto',
    hour: 'Hora',
    dayOfMonth: 'Día del mes',
    month: 'Mes',
    dayOfWeek: 'Día de la semana',
    pattern: 'Patrón',
    testString: 'Texto de prueba',
    flagGlobal: 'Global (g)',
    flagIgnoreCase: 'Ignorar mayúsculas (i)',
    flagMultiline: 'Multilínea (m)',
  },
  labels: {
    plainText: 'Texto plano',
    base64Text: 'Texto Base64',
    urlEncodedText: 'Texto codificado en URL',
    htmlEntities: 'Entidades HTML',
    header: 'CABECERA',
    payload: 'PAYLOAD',
    signature: 'FIRMA',
    iso: 'ISO 8601',
    utc: 'UTC',
    relative: 'Relativo',
    networkAddress: 'Dirección de red',
    broadcastAddress: 'Dirección de broadcast',
    subnetMask: 'Máscara de subred',
    hostRange: 'Rango de hosts utilizables',
    totalAddresses: 'Direcciones totales',
    usableHosts: 'Hosts utilizables',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    expression: 'Expresión',
    choosePreset: 'Elige un preajuste…',
    noMatches: 'Sin coincidencias',
    matchCount: '{count} coincidencias',
    matchIndex: 'índice {index}',
  },
  presets: {
    everyMinute: 'Cada minuto',
    hourly: 'Cada hora',
    daily: 'Cada día a las 09:00',
    weekdays: 'Días laborables a las 09:00',
  },
  strength: {
    weak: 'Débil',
    fair: 'Aceptable',
    strong: 'Fuerte',
    veryStrong: 'Muy fuerte',
  },
  errors: {
    invalidCidr: 'Introduce un CIDR válido, ej. 10.0.0.0/16',
    invalidJwt:
      'No es un JWT válido — se esperaban 3 partes separadas por puntos.',
    undecodableJwt: 'No se ha podido decodificar este token.',
    invalidColor: 'Introduce un color válido (hex, rgb o hsl)',
    invalidCron: 'Introduce una expresión cron válida de 5 campos',
    invalidRegex: 'Expresión regular no válida',
  },
  copiedSuffix: ' copiado',
} as const satisfies ToolboxDictTranslated;

export default dict;
