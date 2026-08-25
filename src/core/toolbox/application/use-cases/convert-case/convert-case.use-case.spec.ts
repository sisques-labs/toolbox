import { ConvertCaseUseCase } from './convert-case.use-case';

describe('ConvertCaseUseCase', () => {
  const useCase = new ConvertCaseUseCase();

  it('converts a space-separated phrase into every supported case', () => {
    const result = useCase.execute('Hello World Example');

    expect(result).toEqual({
      camelCase: 'helloWorldExample',
      pascalCase: 'HelloWorldExample',
      snakeCase: 'hello_world_example',
      kebabCase: 'hello-world-example',
      constantCase: 'HELLO_WORLD_EXAMPLE',
      titleCase: 'Hello World Example',
    });
  });

  it('splits camelCase input on lower-to-upper boundaries', () => {
    const result = useCase.execute('myVariableName');

    expect(result.snakeCase).toBe('my_variable_name');
    expect(result.kebabCase).toBe('my-variable-name');
  });

  it('treats underscores and hyphens as word separators', () => {
    const result = useCase.execute('my_variable-name');

    expect(result.camelCase).toBe('myVariableName');
    expect(result.pascalCase).toBe('MyVariableName');
  });

  it('handles a single word', () => {
    const result = useCase.execute('toolbox');

    expect(result).toEqual({
      camelCase: 'toolbox',
      pascalCase: 'Toolbox',
      snakeCase: 'toolbox',
      kebabCase: 'toolbox',
      constantCase: 'TOOLBOX',
      titleCase: 'Toolbox',
    });
  });
});
