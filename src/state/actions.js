import { createActions } from 'redux-actions'
import { safeLyrics, safeSuggestion } from '../api'
import {
  chain,
  F,
  Future,
  pipe,
  randomWord,
  stringHead,
  splitString,
  trimString,
  trimSpace,
} from '../helpers'

const lyricsFactory = payload => x => dispatch =>
  safeLyrics(trimString(payload))(x).map(res => {
    dispatch(lyrics([res]))
    return res
  })

const factoryMapping = payload => dispatch => fn =>
  pipe(
    splitString(trimSpace(payload)).map(x =>
      chain(y => fn(randomWord(y))(x)(dispatch))
    )
  )

const { errorMessage, lyrics, suggestion, word } = createActions(
  'ERROR_MESSAGE',
  'LYRICS',
  'SUGGESTION',
  'WORD'
)

export const makeError = dispatch => err => {
  dispatch(errorMessage(err.message))
  Future.after(4000, errorMessage('')).fork(
    err => dispatch(errorMessage(err.message)),
    dispatch
  )
}

export const makeLyrics = payload => dispatch => {
  dispatch(word(payload))
  dispatch(lyrics(null))
  factoryMapping(payload)(dispatch)(lyricsFactory)(
    lyricsFactory(payload)(stringHead(payload))(dispatch)
  ).fork(makeError(dispatch), F)
}

export const makeSuggestion = payload => dispatch => {
  dispatch(suggestion([{ word: payload }]))
  safeSuggestion(payload).fork(makeError(dispatch), res =>
    dispatch(suggestion(res))
  )
}
