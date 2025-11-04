# Phase 3 Complete: Extract JSON Decoration Logic

**Status:** ✅ Complete
**Date:** November 4, 2025
**Baseline:** All 26 tests passing (14 existing + 12 new)

## Summary

Successfully extracted the brace-scanning decoration logic from `Output.tsx` into a dedicated, tested utility module (`jsonDecorations.ts`). This improves maintainability, adds comprehensive test coverage, and reduces component complexity by 100+ lines while preserving exact behavior.

## Changes Made

### 1. Core Utility (`src/utils/jsonDecorations.ts`)

- ✅ `JsonErrorDecoration` interface - Monaco decoration shape for error objects
- ✅ `buildLineStarts(text)` - Precompute line offsets for O(log n) position lookup
- ✅ `offsetToPosition(offset, lineStarts)` - Binary search character offset to line:column
- ✅ `findObjectRanges(text)` - Scan JSON for brace pairs, respecting string boundaries
- ✅ `extractCategory(objectText)` - Parse error category from JSON object
- ✅ `findInnermostRange(offset, ranges)` - Locate containing object for error marker
- ✅ `getCategoryStyles(category)` - Map category to CSS classes and colors
- ✅ `generateJsonErrorDecorations(jsonText)` - Main public API (replaces inline logic)

### 2. Comprehensive Test Suite (`src/utils/jsonDecorations.test.ts`)

- ✅ Empty input handling
- ✅ JSON without errors (no false positives)
- ✅ Single syntax error detection
- ✅ Single validation error detection
- ✅ Multiple error objects in array
- ✅ Missing category defaults to 'syntax'
- ✅ Nested error objects
- ✅ Minified JSON (no whitespace)
- ✅ Correct line/column position calculation
- ✅ Ignore `__error` inside string values (no false positives)
- ✅ Runtime error category handling
- ✅ Escaped quotes in strings

### 3. Component Simplification (`src/components/output/Output.tsx`)

- ✅ Replaced 100+ line inline decoration logic with single utility call
- ✅ Reduced useMemo complexity from ~100 lines to 3 lines
- ✅ Improved readability and maintainability
- ✅ Added import for `generateJsonErrorDecorations`
- ✅ Preserved exact decoration behavior

### 4. Type Definitions (`src/types/errors.ts`)

- ✅ Added `JsonDecoration` interface (for future parser-side emission)
- ✅ Documented as preparation for eliminating brace-scanning
- ✅ Includes `category`, `startOffset`, `endOffset`, `errorId`

## Verification

### Tests

```
✅ 26/26 tests passing
   - 14 existing tests (errorSorting.test.ts)
   - 12 new tests (jsonDecorations.test.ts)
✅ Production build succeeds (156.6 kB gzipped)
✅ No new TypeScript errors introduced
✅ All edge cases covered with explicit tests
```

### Build Output

```
Compiled successfully.
File sizes after gzip:
  156.6 kB (+59 B)  build\static\js\main.0099a15f.js
```

## Code Quality Improvements

### Before (Inline in Output.tsx)

```typescript
const outputDecorations = useMemo(() => {
  if (!value) return [] as any[];
  const text: string = value;

  // 100+ lines of:
  // - Line start index calculation
  // - Binary search position conversion
  // - Brace scanning with string escape handling
  // - Category extraction with regex
  // - Style mapping logic
  // - Monaco decoration building

  return decorations;
}, [value]);
```

**Issues:**
- No test coverage for complex logic
- Mixed concerns (React + parsing + positioning)
- Difficult to debug brace-matching edge cases
- Hard to modify or extend
- String escaping logic hidden in component

### After (Extracted Utility)

```typescript
const outputDecorations = useMemo(() => {
  return generateJsonErrorDecorations(value || '');
}, [value]);
```

**Benefits:**
- ✅ 12 comprehensive tests
- ✅ Clear separation of concerns
- ✅ Easy to debug with isolated tests
- ✅ Simple to extend with new categories
- ✅ String escaping explicitly tested

## Technical Debt Documentation

### Current Approach: Brace-Scanning

The utility scans the stringified JSON output to find error objects marked with `"__error": true`. This is a **pragmatic solution** with these trade-offs:

**Pros:**
- ✅ Works with existing parser (no core library changes)
- ✅ Now fully tested and maintainable
- ✅ Handles all JSON formats (minified, formatted, nested)
- ✅ Respects string boundaries and escape sequences

**Cons:**
- ⚠️ O(n) scan of JSON output on every render
- ⚠️ Relies on `__error` marker pattern
- ⚠️ Fragile to JSON format changes

### Future Enhancement Path

The `JsonDecoration` interface in `types/errors.ts` documents the ideal approach:

```typescript
export interface JsonDecoration {
  category: ErrorCategory;
  startOffset: number;
  endOffset: number;
  errorId?: string;
}
```

**Ideal Flow:**
1. Parser's `toJSON()` method tracks error object positions during serialization
2. Returns `{ json: string, decorations: JsonDecoration[] }`
3. UI consumes pre-computed decoration metadata (O(1) lookup)
4. Eliminates brace-scanning entirely

**Migration Path:**
1. ✅ Phase 3: Extract and test brace-scanning (DONE)
2. 📋 Phase X: Add decoration tracking to IO parser
3. 📋 Phase X+1: Update playground to consume parser-emitted decorations
4. 📋 Phase X+2: Remove brace-scanning utility (or keep as fallback)

## Performance Impact

- Build size: +59 bytes (0.04% increase) - negligible
- Runtime performance: **Identical** (same algorithm, better packaging)
  - Still O(n) for JSON scan (n = JSON length)
  - Binary search for position mapping O(log m) (m = line count)
  - No performance regression vs inline version
- Memory: Slightly better (function reuse vs inline closure)
- Testability: **Dramatically improved**

## Files Modified

1. `src/types/errors.ts` - Added `JsonDecoration` interface for future use
2. `src/utils/jsonDecorations.ts` (NEW) - 230 lines of tested decoration logic
3. `src/utils/jsonDecorations.test.ts` (NEW) - 12 comprehensive test cases
4. `src/components/output/Output.tsx` - Simplified from ~150 lines to ~50 lines

## Regression Testing

- ✅ JSON error objects highlighted in Monaco output
- ✅ Syntax errors show red styling (io-error-syntax class)
- ✅ Validation errors show orange styling (io-error-validation class)
- ✅ Gutter icons appear for error objects
- ✅ Overview ruler shows error positions
- ✅ Hover message displays error category
- ✅ Decorations update when JSON output changes
- ✅ No decorations shown for valid JSON
- ✅ Nested error objects detected correctly
- ✅ Minified JSON handled properly
- ✅ String escaping doesn't create false positives

## Test Coverage Details

### Edge Cases Covered

1. **Empty/Null Input**
   - Empty string returns empty array
   - Null/undefined handled gracefully

2. **Valid JSON (No Errors)**
   - Objects without `__error` ignored
   - No false positives

3. **Error Detection**
   - Single syntax error
   - Single validation error
   - Multiple errors in array
   - Runtime error category

4. **Category Handling**
   - Explicit category extraction
   - Default to 'syntax' when missing
   - All three categories tested

5. **JSON Formats**
   - Pretty-printed (formatted)
   - Minified (no whitespace)
   - Nested objects
   - Arrays of errors

6. **String Handling**
   - `"__error": true` inside string values ignored
   - Escaped quotes handled correctly
   - Backslash escaping tested

7. **Position Accuracy**
   - Line numbers correct for multi-line JSON
   - Column positions accurate
   - Start/end positions properly calculated

## Next Phase Ready

Phase 3 completes the UI-side refactoring of error decorations. The extraction enables:

- **Phase 4:** Web Worker parsing (decoration logic is now portable)
- **Phase 5:** Type safety improvements (utility has clean interface)
- **Phase 6:** A11y enhancements (decoration metadata easily accessible)
- **Phase 7:** Theming (CSS class generation centralized)
- **Future:** Parser-side decoration emission (interface defined, easy migration)

## Migration Benefits

### Immediate Wins

1. **Testability** - 100+ lines of complex logic now has 12 tests
2. **Maintainability** - Clear function boundaries and documentation
3. **Debuggability** - Isolated utility can be tested independently
4. **Reusability** - Can use in other components if needed
5. **Component Simplicity** - Output.tsx is now 66% smaller

### Long-term Wins

1. **Performance Monitoring** - Can instrument utility separately
2. **Optimization Path** - Easy to optimize without touching React
3. **Parser Integration** - Clean interface for future enhancement
4. **Worker Support** - Portable function works in worker context
5. **Documentation** - Self-contained module with usage examples

## Known Limitations

- Still uses brace-scanning (O(n) on JSON output)
- Requires `__error` marker in JSON (parser contract)
- Category must be in JSON object (not inferred from elsewhere)
- No deduplication of overlapping decorations

These are **documented and acceptable** - they reflect the current parser capabilities. The extracted utility makes future improvements easy when parser support is added.

## Architectural Impact

This phase demonstrates the refactor strategy working well:

1. ✅ **Zero Breaking Changes** - Exact behavior preserved
2. ✅ **Incremental Progress** - Small, testable improvements
3. ✅ **Test Coverage Growth** - 14 → 26 tests
4. ✅ **Code Quality Improvement** - Complex logic extracted
5. ✅ **Documentation Added** - Technical debt tracked

The pattern established here (extract → test → simplify) will be used in subsequent phases.
