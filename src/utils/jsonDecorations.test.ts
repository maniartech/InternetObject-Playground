import { generateJsonErrorDecorations } from './jsonDecorations';

describe('generateJsonErrorDecorations', () => {
  it('should return empty array for empty input', () => {
    expect(generateJsonErrorDecorations('')).toEqual([]);
  });

  it('should return empty array for JSON without errors', () => {
    const json = JSON.stringify({ name: 'John', age: 30 }, null, 2);
    expect(generateJsonErrorDecorations(json)).toEqual([]);
  });

  it('should find single syntax error object', () => {
    const json = JSON.stringify([
      { name: 'John' },
      { __error: true, category: 'syntax', message: 'Invalid token' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].hoverMessage).toBe('Syntax error');
    expect(decorations[0].className).toContain('io-error-syntax');
    expect(decorations[0].glyphMarginClassName).toBe('io-gutter-syntax');
  });

  it('should find single validation error object', () => {
    const json = JSON.stringify([
      { name: 'John' },
      { __error: true, category: 'validation', message: 'Value out of range' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].hoverMessage).toBe('Validation error');
    expect(decorations[0].className).toContain('io-error-validation');
    expect(decorations[0].glyphMarginClassName).toBe('io-gutter-validation');
  });

  it('should find multiple error objects', () => {
    const json = JSON.stringify([
      { __error: true, category: 'syntax', message: 'Error 1' },
      { name: 'Valid' },
      { __error: true, category: 'validation', message: 'Error 2' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(2);
    expect(decorations[0].className).toContain('io-error-syntax');
    expect(decorations[1].className).toContain('io-error-validation');
  });

  it('should default to syntax category when category missing', () => {
    const json = JSON.stringify([
      { __error: true, message: 'No category' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].hoverMessage).toBe('Syntax error');
  });

  it('should handle nested objects with errors', () => {
    const json = JSON.stringify({
      items: [
        { __error: true, category: 'syntax', message: 'Nested error' },
      ],
    }, null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].className).toContain('io-error-syntax');
  });

  it('should handle minified JSON (no formatting)', () => {
    const json = JSON.stringify([
      { __error: true, category: 'validation', message: 'Error' },
    ]);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].hoverMessage).toBe('Validation error');
  });

  it('should provide correct line and column positions', () => {
    const json = JSON.stringify([
      { name: 'First' },
      { __error: true, category: 'syntax', message: 'Error on line 4' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    // Error object should start after first object
    expect(decorations[0].startLineNumber).toBeGreaterThan(1);
    expect(decorations[0].startColumn).toBeGreaterThan(0);
    expect(decorations[0].endLineNumber).toBeGreaterThanOrEqual(decorations[0].startLineNumber);
  });

  it('should ignore __error inside string values', () => {
    const json = JSON.stringify([
      { message: '"__error": true is not an error here' },
      { name: 'Text with "__error": true pattern' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    // Should find no decorations because __error is only in strings
    expect(decorations).toHaveLength(0);
  });

  it('should handle runtime error category', () => {
    const json = JSON.stringify([
      { __error: true, category: 'runtime', message: 'Runtime error' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].hoverMessage).toBe('Runtime error');
    // Runtime uses syntax styling (red)
    expect(decorations[0].className).toContain('io-error-syntax');
  });

  it('should handle escaped quotes in strings correctly', () => {
    const json = JSON.stringify([
      { message: 'Text with \\"escaped quotes\\"' },
      { __error: true, category: 'syntax', message: 'Real error' },
    ], null, 2);

    const decorations = generateJsonErrorDecorations(json);

    expect(decorations).toHaveLength(1);
    expect(decorations[0].hoverMessage).toBe('Syntax error');
  });
});
