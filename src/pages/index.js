import React from 'react'
import { connect } from 'react-redux'

import { makeLyrics, makeSuggestion } from '../state/actions'
import Layout from '../components/layout'
import {
  fromCyrilicToLatin,
  hasLength,
  randomNum,
  randomWord,
  stringHead,
  R,
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
          suggestions.map(({ word, score }, i) => (
            <p key={i}>
              <span key={word} onClick={() => makeLyrics(word)}>
                {word}
              </span>
              <span key={score}> {score}</span>
            </p>
          ))}
        {hasLength(error) && <p>{error}</p>}
        {hasLength(lyrics) &&
          R.drop(1, lyrics).map(xs => (
            <>
              <h2 key={randomNum(xs)}>{stringHead(randomWord(xs))}</h2>
              <p key={randomWord(xs)}>{randomWord(xs)}</p>
            </>
          ))}
      </div>
    </Layout>
  )
})

export default IndexPage
