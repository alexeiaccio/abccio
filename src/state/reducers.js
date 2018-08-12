import { handleActions } from 'redux-actions'
import { S } from '../helpers'
const { insert } = S

const initialState = {
  suggestions: [{}],
} 

export const reducers = handleActions(
  {
    SUGGESTION: (state, action) => 
      insert('suggestions')(action.payload)(state),
  },
  initialState
)
