import { ConvertXmlJsonUseCase } from './convert-xml-json.use-case';

describe('ConvertXmlJsonUseCase', () => {
  const useCase = new ConvertXmlJsonUseCase();

  it('converts a simple XML document to JSON', () => {
    const result = useCase.xmlToJson(
      '<root><name>Toolbox</name><version>1</version></root>',
    );
    expect(result).toEqual({
      ok: true,
      json: '{\n  "root": {\n    "name": "Toolbox",\n    "version": "1"\n  }\n}',
    });
  });

  it('represents attributes and text content', () => {
    const result = useCase.xmlToJson('<user id="1">Alice</user>');
    expect(result).toEqual({
      ok: true,
      json: '{\n  "user": {\n    "@id": "1",\n    "#text": "Alice"\n  }\n}',
    });
  });

  it('rejects malformed XML', () => {
    expect(useCase.xmlToJson('<root><a></root>').ok).toBe(false);
  });

  it('converts JSON back to XML', () => {
    const result = useCase.jsonToXml(
      '{"root":{"name":"Toolbox","version":"1"}}',
    );
    expect(result).toEqual({
      ok: true,
      xml: '<root>\n  <name>Toolbox</name>\n  <version>1</version>\n</root>',
    });
  });

  it('converts JSON with attributes and text back to XML', () => {
    const result = useCase.jsonToXml('{"user":{"@id":"1","#text":"Alice"}}');
    expect(result).toEqual({
      ok: true,
      xml: '<user id="1">Alice</user>',
    });
  });

  it('escapes double quotes in attribute values to avoid attribute injection', () => {
    const result = useCase.jsonToXml(
      '{"user":{"@id":"1\\" onclick=\\"evil()"}}',
    );
    expect(result).toEqual({
      ok: true,
      xml: '<user id="1&quot; onclick=&quot;evil()"></user>',
    });
  });

  it('rejects malformed JSON', () => {
    expect(useCase.jsonToXml('not json').ok).toBe(false);
  });
});
