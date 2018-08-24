/* global tw */
import React from 'react'
import { css, keyframes } from 'react-emotion'
import { connect } from 'react-redux'

import { Appearing } from './appearing'
import { letsGo, resetLyrics } from '../state/actions'
import {
  lengthDiff,
  lengthMinusOne,
  pick,
  splitString,
  subtract,
  trimmedLength,
  uuid,
} from '../helpers'
import { ButtonFilled, ButtonOutline } from './buttons'
import { Container } from './container'

const loading = keyframes`
  from, to {
    color: #ffed4a;
  }
  50% {
    color: #e3342f;
  }
`

export const Word = connect(
  pick(['lyrics', 'word']),
  { letsGo, resetLyrics }
)(({ letsGo, lyrics, resetLyrics, word }) => (
  <>
    <div
      className={css`
        ${tw(['font-accio', 'text-heading1', 'tracking-wide', 'uppercase'])};
        ${lengthMinusOne(lyrics) === trimmedLength(word) &&
          tw('cursor-pointer')};
        animation: ${lengthMinusOne(lyrics) !== trimmedLength(word) && loading}
          2s linear infinite;
        &:hover span {
          ${lengthMinusOne(lyrics) === trimmedLength(word) && tw('text-pink')};
        }
      `}
      onClick={() => letsGo(true)}
    >
      <Appearing>
        {splitString(word).map((char, i) => (
          <span
            className={css`
              ${subtract(lengthMinusOne(lyrics), lengthDiff(word, lyrics)) >
                i && tw('text-white')};
              opacity: ${subtract(
                lengthMinusOne(lyrics),
                lengthDiff(word, lyrics)
              ) > i
                ? 1
                : 0.5};
            `}
            key={uuid()}
          >
            {char}
          </span>
        ))}
      </Appearing>
    </div>
    <Container>
      {lengthMinusOne(lyrics) === trimmedLength(word) && (
        <Appearing>
          <ButtonFilled onClick={() => letsGo(true)}>go...</ButtonFilled>
        </Appearing>
      )}
      <Appearing>
        <ButtonOutline onClick={resetLyrics}>back</ButtonOutline>
      </Appearing>
    </Container>
  </>
))
