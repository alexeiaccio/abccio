import { createActions } from 'redux-actions'
import { safeSuggestion } from '../api'
import { Future } from '../helpers'

const { errorMessage, suggestion } = createActions(
  'ERROR_MESSAGE',
  'SUGGESTION'
)

const makeError = dispatch => err => {
  dispatch(errorMessage(err.message))
  Future.after(4000, errorMessage(''))
  .fork(
    err => dispatch(errorMessage(err.message)),
    dispatch
  )
}

export const makeSuggestion = payload =>
  dispatch => {
    dispatch(suggestion([{ word: payload }]))
    safeSuggestion(payload)
      .fork(
        makeError(dispatch),
        res => dispatch(suggestion(res))
      )
  }
  