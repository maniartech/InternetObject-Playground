import {atom} from 'recoil';

const editorPosition = atom({
  key: 'editorPosition', // unique ID (with respect to other atoms/selectors)
  default: {             // default value (aka initial value)
    editorName: '',
    row: 1,
    column: 1,
    position: 1,
  },
});

export default editorPosition;
