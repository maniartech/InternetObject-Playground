# Error Recovery & Multiple Error Display Demo

This document demonstrates the new error recovery feature in the Internet Object playground.

## Phase 2: Error Accumulation

The parser now accumulates multiple errors during parsing and displays them all at once, providing better developer experience.

## Test Case 1: Multiple Duplicate Sections

```io
---users
name, age
John, 30

---users
name, age
Jane, 25

---users
name, age
Bob, 35
```

**Expected Result:**
- Parser creates sections: `users`, `users_2`, `users_3`
- Displays 2 errors:
  1. "Duplicate section name 'users' found. Renamed to 'users_2'"
  2. "Duplicate section name 'users' found. Renamed to 'users_3'"
- Shows parsed output with all three sections

## Test Case 2: Multiple Collection Errors

```io
name, age
John, 30
~
~ Invalid item - missing data
Sarah, 25
~
~ Another invalid item
```

**Expected Result:**
- Parser continues processing after each error
- Accumulates all collection errors
- Shows parsed output with valid items
- Displays all error messages

## Test Case 3: Mixed Errors

```io
---products
name, price
Widget, 19.99

---products
name, price
~ Invalid product data
Gadget, 29.99

---products
name, price
Doohickey, 39.99
```

**Expected Result:**
- Multiple duplicate section errors
- Collection parsing errors
- All errors displayed together
- Partial output shown with recovered data

## Benefits

1. **Better Developer Experience**: See all errors at once instead of fixing one at a time
2. **Resilient Parsing**: Parser recovers from errors and shows partial output
3. **Auto-Rename**: Duplicate sections are automatically renamed (name → name_2 → name_3)
4. **IDE Integration**: Error markers show in the editor at the correct positions

## Implementation Details

- `DocumentNode.getErrors()`: Returns all accumulated errors
- Error accumulation happens at lowest level (collection/section)
- Playground displays all errors in overlay with separators
- JSON output shows successfully parsed data even when errors exist
