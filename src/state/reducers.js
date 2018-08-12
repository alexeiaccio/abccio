import { handleActions } from 'redux-actions'

const initialState = {
  error: '',
  suggestions: [{}],
} 

export const reducers = handleActions(
  {
    ERROR_MESSAGE: (state, action) => ({
      ...state,
      error: action.payload
    }),
    SUGGESTION: (state, action) => ({
      ...state,
      suggestions: action.payload
    }),
  },
  initialState
)
