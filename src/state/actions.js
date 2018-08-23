import { createActions } from 'redux-actions'
import { safeLyrics, safeSuggestion } from '../api'
import {
  chain,
  Future,
  mockSuggestion,
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

const {
  current,
  errorMessage,
  formValue,
  go,
  last,
  lyrics,
  suggestion,
  word,
} = createActions(
  'CURRENT',
  'ERROR_MESSAGE',
  'FORM_VALUE',
  'GO',
  'LAST',
  'LYRICS',
  'SUGGESTION',
  'WORD'
)

export const letsGo = payload => dispatch => {
  dispatch(go([payload]))
}

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
  ).fork(makeError(dispatch), console.log)
}

export const makeSuggestion = payload => dispatch => {
  dispatch(formValue(payload))
  safeSuggestion(payload).fork(makeError(dispatch), res =>
    dispatch(suggestion(res))
  )
}

export const nextLetter = () => dispatch => {
  dispatch(current())
}

export const resetLyrics = () => dispatch => {
  dispatch(word(''))
  dispatch(suggestion(mockSuggestion))
}

export const toLast = payload => dispatch => {
  dispatch(last(payload))
}
