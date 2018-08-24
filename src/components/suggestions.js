/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { connect } from 'react-redux'

import { makeLyrics } from '../state/actions'
import { ButtonTemplate } from './buttons'
import { hasLength, pick, uuid } from '../helpers'

export const Suggestions = connect(
  pick(['formValue', 'suggestions']),
  { makeLyrics }
)(({ formValue, makeLyrics, suggestions }) => (
  <div
    className={css`
      ${tw('-mx-8 w-full')};
    `}
  >
    {suggestions &&
      suggestions.map(({ word }, i) => (
        <button
          className={css`
            ${ButtonTemplate};
            ${tw(['bg-transparent', 'text-white', 'my-1', 'w-full'])};
            ${word !== ' ' &&
              hasLength(formValue) &&
              tw(['cursor-pointer', 'hover:bg-pink', 'hover:opacity-100'])};
            opacity: ${word === ' ' ? 0 : (100 - i * 20) / 100};
          `}
          key={uuid()}
          onClick={() => hasLength(formValue) && makeLyrics(word)}
          title={word}
        >
          {word}
        </button>
      ))}
  </div>
))
