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
  first,
  formValue,
  go,
  last,
  lyrics,
  second,
  suggestion,
  word,
} = createActions(
  'CURRENT',
  'ERROR_MESSAGE',
  'FIRST',
  'FORM_VALUE',
  'GO',
  'LAST',
  'LYRICS',
  'SECOND',
  'SUGGESTION',
  'WORD'
)

export const letsGo = payload => dispatch => {
  dispatch(second(false))
  dispatch(go(payload))
}

export const makeError = dispatch => err => {
  dispatch(errorMessage(err.message))
  Future.after(4000, errorMessage('')).fork(
    err => dispatch(errorMessage(err.message)),
    dispatch
  )
}

export const makeLyrics = payload => dispatch => {
  dispatch(first(false))
  dispatch(second(true))
  dispatch(lyrics(null))
  dispatch(word(payload))
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

export const resetLast = () => dispatch => {
  dispatch(current(0))
  dispatch(first(true))
  dispatch(formValue(''))
  dispatch(go(false))
  dispatch(last(false))
  dispatch(suggestion(mockSuggestion))
  dispatch(word(''))
}

export const resetLyrics = () => dispatch => {
  dispatch(first(true))
  dispatch(formValue(''))
  dispatch(second(false))
  dispatch(suggestion(mockSuggestion))
  Future.after(600, '').value(x => {
    dispatch(lyrics(null))
    dispatch(word(x))
  })
}

export const toLast = payload => dispatch => {
  dispatch(last(payload))
}
