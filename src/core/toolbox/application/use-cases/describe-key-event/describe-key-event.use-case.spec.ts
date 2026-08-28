import { DescribeKeyEventUseCase } from './describe-key-event.use-case';

describe('DescribeKeyEventUseCase', () => {
  const useCase = new DescribeKeyEventUseCase();

  it('describes a plain keypress with no modifiers', () => {
    const result = useCase.execute({
      key: 'a',
      code: 'KeyA',
      keyCode: 65,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    });
    expect(result).toEqual({
      key: 'a',
      code: 'KeyA',
      keyCode: 65,
      modifiers: [],
    });
  });

  it('lists every active modifier in a stable order', () => {
    const result = useCase.execute({
      key: 'A',
      code: 'KeyA',
      keyCode: 65,
      altKey: true,
      ctrlKey: true,
      metaKey: true,
      shiftKey: true,
    });
    expect(result.modifiers).toEqual(['Ctrl', 'Alt', 'Shift', 'Meta']);
  });
});
