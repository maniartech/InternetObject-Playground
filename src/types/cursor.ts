/** Caret position surfaced to the status bar (replaces the old Recoil atom). */
export interface CursorState {
  editorName: string;
  row: number;
  column: number;
  position: number;
}

export const INITIAL_CURSOR: CursorState = { editorName: '', row: 1, column: 1, position: 1 };
