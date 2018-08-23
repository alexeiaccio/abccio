import { handleActions } from 'redux-actions'
import { assoc, concat, mergeWith, mockSuggestion } from '../helpers'

const initialState = {
  error: '',
  formValue: '',
  go: false,
  lyrics: [],
  suggestions: mockSuggestion,
  word: '',
}

export const reducers = handleActions(
  {
    ERROR_MESSAGE: (state, action) => assoc('error', action.payload, state),
    FORM_VALUE: (state, action) => assoc('formValue', action.payload, state),
    GO: (state, action) => assoc('go', action.payload, state),
    LYRICS: (state, action) =>
      action.payload === null
        ? assoc('lyrics', [], state)
        : mergeWith(concat, state, { lyrics: action.payload }),
    SUGGESTION: (state, action) => assoc('suggestions', action.payload, state),
    WORD: (state, action) => assoc('word', action.payload, state),
  },
  initialState
)
