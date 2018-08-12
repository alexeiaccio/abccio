import { createActions } from 'redux-actions'
import { getSuggestion } from '../api'
import { futureOfArray, hasLength, ifElse, Future } from '../helpers'

const safeSuggestion = ifElse(hasLength)(getSuggestion)(futureOfArray)

const { errorMessage, suggestion } = createActions(
  'ERROR_MESSAGE',
  'SUGGESTION'
)

export const makeSuggestion = payload =>
  dispatch => {
    dispatch(suggestion([{ word: payload }]))
    safeSuggestion(payload)
      .fork(
        err => dispatch(errorMessage(err.message)),
        res => dispatch(suggestion(res))
      )
      Future.after(4000, errorMessage(''))
      .fork(
        err => dispatch(errorMessage(err.message)),
        dispatch
      )
  }
  