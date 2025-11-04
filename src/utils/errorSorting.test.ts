import { parseErrorPosition, sortErrorMessages, findMarkerForPosition } from './errorSorting';

describe('parseErrorPosition', () => {
  it('should parse position from error message', () => {
    const msg = 'SYNTAX_ERROR: "expecting-bracket" "Missing closing brace \'}\'" at 17:38';
    const pos = parseErrorPosition(msg);
    expect(pos).toEqual({ line: 17, col: 38 });
  });

  it('should handle multiple "at" occurrences and pick the last', () => {
    const msg = 'Error at 5:10 in context at 12:20';
    const pos = parseErrorPosition(msg);
    expect(pos).toEqual({ line: 12, col: 20 });
  });

  it('should return sentinel for messages without position', () => {
    const msg = 'General error without position';
    const pos = parseErrorPosition(msg);
    expect(pos.line).toBe(Number.MAX_SAFE_INTEGER);
    expect(pos.col).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle invalid numbers gracefully', () => {
    const msg = 'Error at abc:def';
    const pos = parseErrorPosition(msg);
    expect(pos.line).toBe(Number.MAX_SAFE_INTEGER);
  });
});

describe('sortErrorMessages', () => {
  it('should sort messages by line then column', () => {
    const messages = [
      'VALIDATION_ERROR: age at 12:19',
      'SYNTAX_ERROR: bracket at 5:10',
      'VALIDATION_ERROR: age at 11:18',
      'SYNTAX_ERROR: comma at 12:5',
    ];

    const sorted = sortErrorMessages(messages);

    expect(sorted).toEqual([
      'SYNTAX_ERROR: bracket at 5:10',
      'VALIDATION_ERROR: age at 11:18',
      'SYNTAX_ERROR: comma at 12:5',
      'VALIDATION_ERROR: age at 12:19',
    ]);
  });

  it('should preserve original order for same position', () => {
    const messages = [
      'Error B at 10:20',
      'Error A at 10:20',
      'Error C at 10:20',
    ];

    const sorted = sortErrorMessages(messages);

    // Stable sort: original order preserved for equal positions
    expect(sorted[0]).toContain('Error B');
    expect(sorted[1]).toContain('Error A');
    expect(sorted[2]).toContain('Error C');
  });

  it('should place messages without positions at the end', () => {
    const messages = [
      'Error without position',
      'Error at 5:10',
      'Another without position',
      'Error at 3:5',
    ];

    const sorted = sortErrorMessages(messages);

    expect(sorted[0]).toContain('at 3:5');
    expect(sorted[1]).toContain('at 5:10');
    expect(sorted[2]).toContain('without position');
    expect(sorted[3]).toContain('Another without');
  });

  it('should not mutate original array', () => {
    const original = ['Error at 10:1', 'Error at 5:1'];
    const originalCopy = [...original];

    sortErrorMessages(original);

    expect(original).toEqual(originalCopy);
  });
});

describe('findMarkerForPosition', () => {
  const markers = [
    { startLineNumber: 5, startColumn: 10, endLineNumber: 5, endColumn: 20 },
    { startLineNumber: 10, startColumn: 1, endLineNumber: 12, endColumn: 30 },
    { startLineNumber: 15, startColumn: 5, endLineNumber: 15, endColumn: 15 },
    { startLineNumber: 20, startColumn: 10, endLineNumber: 20, endColumn: 25 },
  ];

  it('should find marker that covers the position', () => {
    const marker = findMarkerForPosition(markers, { line: 11, col: 15 });
    expect(marker).toBe(markers[1]); // Line 10-12 marker
  });

  it('should find nearest marker on same line when no covering marker', () => {
    const marker = findMarkerForPosition(markers, { line: 5, col: 25 });
    expect(marker).toBe(markers[0]); // Same line, col 25 closest to marker at col 10-20
  });

  it('should find nearest marker by line when no same-line match', () => {
    const marker = findMarkerForPosition(markers, { line: 8, col: 5 });
    expect(marker).toBe(markers[1]); // Line 10 is closest to 8
  });

  it('should return null for empty markers array', () => {
    const marker = findMarkerForPosition([], { line: 5, col: 10 });
    expect(marker).toBeNull();
  });

  it('should handle markers with undefined positions', () => {
    const partialMarkers = [
      { startLineNumber: 5 },
      { startLineNumber: 10, startColumn: 1, endLineNumber: 10, endColumn: 20 },
    ];

    const marker = findMarkerForPosition(partialMarkers, { line: 10, col: 5 });
    expect(marker).toBe(partialMarkers[1]);
  });

  it('should prefer exact coverage over proximity', () => {
    const testMarkers = [
      { startLineNumber: 10, startColumn: 1, endLineNumber: 10, endColumn: 50 },
      { startLineNumber: 12, startColumn: 1, endLineNumber: 12, endColumn: 20 },
    ];

    const marker = findMarkerForPosition(testMarkers, { line: 10, col: 25 });
    expect(marker).toBe(testMarkers[0]); // Covers position, not just closest
  });
});
