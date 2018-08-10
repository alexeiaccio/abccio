import {  handleActions } from 'redux-actions'

const initialState = {
  poop: false,
} 

export const reducers = handleActions(
  {
    POOP: (state, action) => ({
      ...state,
      poop: action.payload
    }),
  },
  initialState
) 