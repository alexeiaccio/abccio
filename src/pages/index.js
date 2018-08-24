/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'react-emotion'

import { App } from '../components/app'
import { Error } from '../components/error'
import Layout from '../components/layout'
import { R, splitString, trimSpace, uuid } from '../helpers'
import {
  makeLyrics,
  makeSuggestion,
  nextLetter,
  resetLast,
  toLast,
} from '../state/actions'

const Container = styled('div')`
  ${tw(['flex', 'flex-col', 'items-center'])};
`

const IndexPage = connect(
  ({ current, error, formValue, go, last, lyrics, suggestions, word }) => ({
    current,
    error,
    formValue,
    go,
    last,
    lyrics,
    suggestions,
    word,
  }),
  {
    makeLyrics,
    makeSuggestion,
    nextLetter,
    resetLast,
    toLast,
  }
)(
  ({
    current,
    error,
    go,
    last,
    lyrics,
    nextLetter,
    resetLast,
    toLast,
    word,
  }) => {
    return (
      <Layout>
        <App />
        <Error />
        {false && (
          <Container>
            <div
              className={css`
                ${tw('flex flex-col items-start text-white')};
              `}
            >
              {splitString(trimSpace(word)).map((char, i) => (
                <p key={uuid()}>
                  <span
                    className={css`
                      ${tw('font-accio text-heading4 uppercase')};
                    `}
                    key={uuid()}
                  >
                    {char}
                  </span>{' '}
                  is for{' '}
                  <span
                    className={css`
                      ${tw('font-accio text-heading5 uppercase')};
                    `}
                    key={uuid()}
                    title={R.drop(1, lyrics)[i].word}
                  >
                    {R.drop(1, lyrics)[i].word}
                  </span>
                </p>
              ))}
            </div>
            <button
              className={css`
                ${tw(
                  'bg-transparent hover:bg-pink block border border-pink border-solid cursor-pointer font-accio mt-8 outline-none px-4 py-2 rounded-lg text-center text-pink hover:text-white text-xl uppercase'
                )};
              `}
              onClick={resetLast}
            >
              back
            </button>
          </Container>
        )}
      </Layout>
    )
  }
)

export default IndexPage
