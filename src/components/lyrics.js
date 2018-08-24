/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { connect } from 'react-redux'

import { nextLetter, toLast } from '../state/actions'
import { AbsoluteContainer, Container } from './container'
import {
  flipSubtract,
  getLyricsWord,
  hasLength,
  pick,
  splitString,
  trimmedLength,
  trimSpace,
} from '../helpers'
import { ScreenTransitions } from './screenTransitions'

export const Lyrics = connect(
  pick(['current', 'go', 'lyrics', 'word']),
  { nextLetter, toLast }
)(
  ({ current, go, lyrics, nextLetter, toLast, word }) =>
    hasLength(lyrics) && (
      <ScreenTransitions inProp={go}>
        <AbsoluteContainer>
          <Container>
            <h2
              className={css`
                ${tw([
                  'font-accio',
                  'cursor-pointer',
                  'text-heading0',
                  'text-white',
                  'hover:text-pink',
                  'uppercase',
                ])};
              `}
              onClick={() =>
                current < flipSubtract(1)(trimmedLength(word))
                  ? nextLetter()
                  : toLast(true)
              }
            >
              {splitString(trimSpace(word))[current]}
            </h2>
            <p>is for</p>
            <p
              className={css`
                ${tw([
                  'font-accio',
                  'text-center',
                  'text-heading2',
                  'text-white',
                  'uppercase',
                ])};
              `}
            >
              {getLyricsWord(lyrics, current)}
            </p>
          </Container>
        </AbsoluteContainer>
      </ScreenTransitions>
    )
)
