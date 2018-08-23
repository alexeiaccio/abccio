/* global tw */
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'react-emotion'

import {
  fromCyrilicToLatin,
  hasLength,
  randomWord,
  splitString,
  stringHead,
  R,
  uuid,
} from '../helpers'
import Layout from '../components/layout'
import { makeLyrics, makeSuggestion } from '../state/actions'

const Heading = styled('h1')`
  ${tw(['relative', 'uppercase'])};
  &:after {
    ${tw(['absolute', 'block', 'text-list', 'text-white', 'tracking-wide'])};
    content: 'beta';
    right: calc(1% - 3.5rem);
    top: calc(20% - 0.5rem);
  }
`

const IndexPage = connect(
  ({ error, lyrics, suggestions }) => ({ error, lyrics, suggestions }),
  { makeLyrics, makeSuggestion }
)(({ error, lyrics, makeLyrics, makeSuggestion, suggestions }) => {
  return (
    <Layout>
      <Heading>
        <span
          className={css`
            ${tw('font-accio text-heading0 text-white ')};
          `}
        >
          abc
        </span>
        <small
          className={css`
            ${tw(
              'flex font-semibold justify-between text-indigo-darkest text-heading5'
            )};
          `}
        >
          {splitString('poetry').map(char => (
            <span key={uuid()}>{char}</span>
          ))}
        </small>
      </Heading>
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
