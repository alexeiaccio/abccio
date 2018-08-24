/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { connect } from 'react-redux'

import { replay, resetLast } from '../state/actions'
import { Appearing } from './appearing'
import { ButtonFilled, ButtonOutline } from './buttons'
import { AbsoluteContainer, Container } from './container'
import { getLyricsWord, pick, splitString, trimSpace, uuid } from '../helpers'
import { ScreenTransitions } from './screenTransitions'

export const Last = connect(
  pick(['last', 'lyrics', 'word']),
  { replay, resetLast }
)(({ last, lyrics, replay, resetLast, word }) => (
  <ScreenTransitions inProp={last}>
    <AbsoluteContainer>
      <Container>
        <div
          className={css`
            ${tw(['flex', 'flex-col', 'items-start', 'whitespace-no-wrap'])};
          `}
        >
          {splitString(trimSpace(word)).map((char, i) => (
            <p key={uuid()}>
              <span
                className={css`
                  ${tw([
                    'font-accio',
                    'text-heading4',
                    'text-white',
                    'uppercase',
                  ])};
                `}
                key={uuid()}
              >
                {char}
              </span>
              <span
                className={css`
                  ${tw(['text-indigo-darkest'])};
                `}
              >
                {' '}
                is for{' '}
              </span>
              <span
                className={css`
                  ${tw([
                    'font-accio',
                    'text-heading5',
                    'text-white',
                    'uppercase',
                  ])};
                `}
                key={uuid()}
                title={getLyricsWord(lyrics, i)}
              >
                {getLyricsWord(lyrics, i)}
              </span>
            </p>
          ))}
        </div>
        <Appearing>
          <ButtonFilled onClick={() => replay(true)}>replay</ButtonFilled>
        </Appearing>
        <Appearing>
          <ButtonOutline onClick={resetLast}>back</ButtonOutline>
        </Appearing>
      </Container>
    </AbsoluteContainer>
  </ScreenTransitions>
))
