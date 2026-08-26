export interface XmlJsonResult {
  ok: boolean;
  json?: string;
}

export interface JsonXmlResult {
  ok: boolean;
  xml?: string;
}

type JsonValue = string | { [key: string]: JsonValue | JsonValue[] };

function isWellFormed(xml: string): boolean {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  return doc.getElementsByTagName('parsererror').length === 0;
}

function elementToValue(el: Element): JsonValue {
  const obj: { [key: string]: JsonValue | JsonValue[] } = {};
  for (const attr of [...el.attributes]) {
    obj[`@${attr.name}`] = attr.value;
  }

  const children = [...el.children];
  if (children.length === 0) {
    const text = (el.textContent ?? '').trim();
    if (Object.keys(obj).length === 0) return text;
    obj['#text'] = text;
    return obj;
  }

  for (const child of children) {
    const value = elementToValue(child);
    const existing = obj[child.tagName];
    if (existing === undefined) {
      obj[child.tagName] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      obj[child.tagName] = [existing, value];
    }
  }
  return obj;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function valueToXml(tagName: string, value: JsonValue, indent: string): string {
  if (typeof value === 'string') {
    return `${indent}<${tagName}>${escapeXml(value)}</${tagName}>`;
  }

  const attrEntries = Object.entries(value).filter(([k]) => k.startsWith('@'));
  const attrs = attrEntries
    .map(([k, v]) => ` ${k.slice(1)}="${escapeXml(String(v))}"`)
    .join('');
  const text = value['#text'];
  const childEntries = Object.entries(value).filter(
    ([k]) => !k.startsWith('@') && k !== '#text',
  );

  if (childEntries.length === 0) {
    const body = typeof text === 'string' ? escapeXml(text) : '';
    return `${indent}<${tagName}${attrs}>${body}</${tagName}>`;
  }

  const childLines = childEntries
    .flatMap(([key, val]) =>
      Array.isArray(val)
        ? val.map((v) => valueToXml(key, v, `${indent}  `))
        : [valueToXml(key, val, `${indent}  `)],
    )
    .join('\n');

  return `${indent}<${tagName}${attrs}>\n${childLines}\n${indent}</${tagName}>`;
}

export class ConvertXmlJsonUseCase {
  xmlToJson(xml: string): XmlJsonResult {
    if (!xml.trim() || !isWellFormed(xml)) return { ok: false };

    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const root = doc.documentElement;
    const result = { [root.tagName]: elementToValue(root) };
    return { ok: true, json: JSON.stringify(result, null, 2) };
  }

  jsonToXml(json: string): JsonXmlResult {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return { ok: false };
    }

    if (typeof parsed !== 'object' || parsed === null) return { ok: false };
    const entries = Object.entries(parsed as Record<string, JsonValue>);
    if (entries.length !== 1) return { ok: false };

    const [rootTag, rootValue] = entries[0];
    return { ok: true, xml: valueToXml(rootTag, rootValue, '') };
  }
}
