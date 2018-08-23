/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import styled, { css, keyframes } from 'react-emotion'

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
import {
  letsGo,
  makeLyrics,
  makeSuggestion,
  resetLyrics,
} from '../state/actions'

const Container = styled('div')`
  ${tw(['flex', 'flex-col', 'items-center'])};
`

const Heading = styled('h1')`
  ${tw(['relative', 'uppercase'])};
  &:after {
    ${tw(['absolute', 'block', 'text-list', 'text-white', 'tracking-wide'])};
    content: 'beta';
    right: calc(1% - 3.5rem);
    top: calc(20% - 0.5rem);
  }
`

const loading = keyframes`
  from, to {
    color: #ffed4a;
  }
  50% {
    color: #e3342f;
  }
`

const IndexPage = connect(
  ({ error, formValue, go, lyrics, suggestions, word }) => ({
    error,
    formValue,
    go,
    lyrics,
    suggestions,
    word,
  }),
  { letsGo, makeLyrics, makeSuggestion, resetLyrics }
)(
  ({
    error,
    formValue,
    go,
    letsGo,
    lyrics,
    makeLyrics,
    makeSuggestion,
    resetLyrics,
    suggestions,
    word,
  }) => {
    return (
      <Layout>
        {!hasLength(word) &&
          !go && (
            <Container>
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
                      'flex font-semibold justify-between -mt-2 text-heading6 text-indigo-darkest'
                    )};
                  `}
                >
                  {splitString('poetry').map(char => (
                    <span key={uuid()}>{char}</span>
                  ))}
                </small>
              </Heading>
              <form
                className={css`
                  ${tw('flex w-full')};
                `}
                onSubmit={e => {
                  makeLyrics(fromCyrilicToLatin(formValue))
                  e.preventDefault()
                }}
              >
                <input
                  className={css`
                    ${tw(
                      'border-2 border-white focus:border-pink border-solid flex-1 font-montserrat outline-none mt-8 px-8 py-4 rounded-lg text-list text-indigo-darkest uppercase'
                    )};
                    background-color: rgba(255, 255, 255, 0.5);
                  `}
                  onChange={e =>
                    makeSuggestion(fromCyrilicToLatin(e.target.value))
                  }
                  placeholder="Print here..."
                  type="text"
                />
              </form>
              <div
                className={css`
                  ${tw('-mx-8 w-full')};
                `}
              >
                {suggestions &&
                  suggestions.map(({ word }, i) => (
                    <p
                      className={css`
                        ${tw(
                          'border border-pink border-solid font-accio my-1 px-4 py-2 rounded-lg text-center text-white text-xl uppercase'
                        )};
                        ${word !== ' ' &&
                          tw('cursor-pointer hover:bg-pink hover:opacity-100')};
                        opacity: ${word === ' ' ? 0 : (100 - i * 20) / 100};
                      `}
                      key={uuid()}
                      onClick={() => makeLyrics(word)}
                      title={word}
                    >
                      {word}
                    </p>
                  ))}
              </div>
            </Container>
          )}
        {hasLength(word) &&
          !go && (
            <Container>
              <div
                className={css`
                  ${tw('font-accio text-heading1 tracking-wide uppercase')};
                  ${R.length(lyrics) - 1 === R.length(word) &&
                    tw('cursor-pointer')};
                  animation: ${R.length(lyrics) - 1 !== R.length(word) &&
                      loading}
                    2s linear infinite;
                  &:hover * {
                    ${R.length(lyrics) - 1 === R.length(word) &&
                      tw('text-pink')};
                  }
                `}
                onClick={() => letsGo(true)}
              >
                {splitString(word).map((char, i) => (
                  <span
                    className={css`
                      ${R.length(lyrics) - 1 > i && tw('text-white')};
                      opacity: ${R.length(lyrics) - 1 > i ? 1 : 0.5};
                    `}
                    key={uuid()}
                  >
                    {char}
                  </span>
                ))}
              </div>
              {R.length(lyrics) - 1 === R.length(word) && (
                <button
                  className={css`
                    ${tw(
                      'bg-white hover:bg-pink block border border-pink border-solid cursor-pointer font-accio mt-8 outline-none px-4 py-2 rounded-lg text-center text-pink hover:text-white text-xl uppercase'
                    )};
                  `}
                  onClick={() => letsGo(true)}
                >
                  go...
                </button>
              )}
              {hasLength(word) && (
                <button
                  className={css`
                    ${tw(
                      'bg-transparent hover:bg-pink block border border-pink border-solid cursor-pointer font-accio mt-8 outline-none px-4 py-2 rounded-lg text-center text-pink hover:text-white text-xl uppercase'
                    )};
                  `}
                  onClick={resetLyrics}
                >
                  back
                </button>
              )}
            </Container>
          )}

        {hasLength(error) && <p>{error}</p>}
        {hasLength(lyrics) &&
          go &&
          R.drop(1, lyrics).map(xs => (
            <Container key={uuid()}>
              <h2 key={uuid()}>{stringHead(randomWord(xs))}</h2>
              <p key={uuid()}>{randomWord(xs)}</p>
            </Container>
          ))}
      </Layout>
    )
  }
)

export default IndexPage
