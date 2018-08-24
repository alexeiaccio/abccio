import { handleActions } from 'redux-actions'
import {
  assoc,
  concat,
  mergeWith,
  mockSuggestion,
  R,
  randomNum,
  S,
  trimSpace,
} from '../helpers'

const initialState = {
  current: 0,
  error: '',
  first: true,
  formValue: '',
  go: false,
  last: false,
  lyrics: [],
  second: false,
  suggestions: mockSuggestion,
  word: '',
}

export const reducers = handleActions(
  {
    CURRENT: (state, action) =>
      assoc(
        'current',
        action.payload !== undefined
          ? action.payload
          : state.current < R.length(trimSpace(state.word)) - 1
            ? state.current + 1
            : state.current,
        state
      ),
    ERROR_MESSAGE: (state, action) => assoc('error', action.payload, state),
    FIRST: (state, action) => assoc('first', action.payload, state),
    FORM_VALUE: (state, action) => assoc('formValue', action.payload, state),
    GO: (state, action) => assoc('go', action.payload, state),
    LAST: (state, action) => assoc('last', action.payload, state),
    LYRICS: (state, action) =>
      action.payload === null
        ? assoc('lyrics', [], state)
        : mergeWith(concat, state, {
            lyrics: [action.payload[0][randomNum(S.size(action.payload[0]))]],
          }),
    SECOND: (state, action) => assoc('second', action.payload, state),
    SUGGESTION: (state, action) => assoc('suggestions', action.payload, state),
    WORD: (state, action) => assoc('word', action.payload, state),
  },
  initialState
)
