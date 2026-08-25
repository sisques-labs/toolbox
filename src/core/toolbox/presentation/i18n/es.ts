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
    password: {
      label: 'Generador de contraseñas',
      description: 'Crea contraseñas aleatorias seguras',
    },
    timestamp: {
      label: 'Conversor de timestamp',
      description: 'Convierte entre tiempo Unix y fechas legibles',
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
  },
  labels: {
    plainText: 'Texto plano',
    base64Text: 'Texto Base64',
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
  },
  copiedSuffix: ' copiado',
} as const satisfies ToolboxDictTranslated;

export default dict;
