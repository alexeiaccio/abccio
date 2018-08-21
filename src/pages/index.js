import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { makeLyrics, makeSuggestion } from '../state/actions'
import Layout from '../components/layout'
import {
  fromCyrilicToLatin,
  hasLength,
  randomWord,
  stringHead,
  R,
  uuid,
} from '../helpers'

const IndexPage = connect(
  ({ error, lyrics, suggestions }) => ({ error, lyrics, suggestions }),
  { makeLyrics, makeSuggestion }
)(({ error, lyrics, makeLyrics, makeSuggestion, suggestions }) => {
  return (
    <Layout>
      <h1>Hi people</h1>
      <input
        type="text"
        placeholder="Print here..."
        onChange={e => makeSuggestion(fromCyrilicToLatin(e.target.value))}
      />
      <button>Now go build something great.</button>
      <div>
        {suggestions &&
          suggestions.map(({ word, score }) => (
            <p key={uuid()}>
              <span key={uuid()} onClick={() => makeLyrics(word)}>
                {word}
              </span>
              <span key={uuid()}> {score}</span>
            </p>
          ))}
        {hasLength(error) && <p>{error}</p>}
        {hasLength(lyrics) &&
          R.drop(1, lyrics).map(xs => (
            <Fragment key={uuid()}>
              <h2 key={uuid()}>{stringHead(randomWord(xs))}</h2>
              <p key={uuid()}>{randomWord(xs)}</p>
            </Fragment>
          ))}
      </div>
    </Layout>
  )
})

export default IndexPage
