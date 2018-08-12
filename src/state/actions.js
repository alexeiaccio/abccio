import { createActions } from 'redux-actions'
import { getSuggestion } from '../api'
import { futureOfArray, hasLength, ifElse } from '../helpers'

const safeSuggestion = ifElse(hasLength)(getSuggestion)(futureOfArray)

const { suggestion } = createActions('SUGGESTION')

export const makeSuggestion = payload =>
  dispatch => {
    dispatch(suggestion([{ word: payload }]))
    safeSuggestion(payload)
      .fork(console.error, 
        res => dispatch(suggestion(res))
      )
  }
  