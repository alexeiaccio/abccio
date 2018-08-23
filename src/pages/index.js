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

const IndexPage = connect(
  ({ error, lyrics, suggestions }) => ({ error, lyrics, suggestions }),
  { makeLyrics, makeSuggestion }
)(({ error, lyrics, makeLyrics, makeSuggestion, suggestions }) => {
  return (
    <Layout>
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
          onSubmit={e => e.preventDefault()}
        >
          <input
            className={css`
              ${tw(
                'border-2 border-white focus:border-pink border-solid flex-1 font-montserrat outline-none mt-8 px-8 py-4 rounded-lg text-list text-indigo-darkest uppercase'
              )};
              background-color: rgba(255, 255, 255, 0.5);
            `}
            onChange={e => makeSuggestion(fromCyrilicToLatin(e.target.value))}
            placeholder="Print here..."
            type="text"
          />
        </form>
        <button
          className={css`
            ${tw('absolute hidden')};
          `}
        >
          go...
        </button>
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
          {hasLength(error) && <p>{error}</p>}
          {hasLength(lyrics) &&
            R.drop(1, lyrics).map(xs => (
              <Fragment key={uuid()}>
                <h2 key={uuid()}>{stringHead(randomWord(xs))}</h2>
                <p key={uuid()}>{randomWord(xs)}</p>
              </Fragment>
            ))}
        </div>
      </Container>
    </Layout>
  )
})

export default IndexPage
