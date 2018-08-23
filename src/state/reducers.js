import { handleActions } from 'redux-actions'
import { assoc, concat, mergeWith, mockSuggestion, R } from '../helpers'

const initialState = {
  current: 0,
  error: '',
  formValue: '',
  go: false,
  last: false,
  lyrics: [],
  suggestions: mockSuggestion,
  word: '',
}

export const reducers = handleActions(
  {
    CURRENT: state =>
      assoc(
        'current',
        state.current < R.length(state.word) - 1
          ? state.current + 1
          : state.current,
        state
      ),
    ERROR_MESSAGE: (state, action) => assoc('error', action.payload, state),
    FORM_VALUE: (state, action) => assoc('formValue', action.payload, state),
    GO: (state, action) => assoc('go', action.payload, state),
    LAST: (state, action) => assoc('last', action.payload, state),
    LYRICS: (state, action) =>
      action.payload === null
        ? assoc('lyrics', [], state)
        : mergeWith(concat, state, { lyrics: action.payload }),
    SUGGESTION: (state, action) => assoc('suggestions', action.payload, state),
    WORD: (state, action) => assoc('word', action.payload, state),
  },
  initialState
)
