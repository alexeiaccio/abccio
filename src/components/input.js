/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { connect } from 'react-redux'

import { makeLyrics, makeSuggestion } from '../state/actions'
import { fromCyrilicToLatin, pick } from '../helpers'

export const Input = connect(
  pick(['formValue']),
  { makeLyrics, makeSuggestion }
)(({ formValue, makeLyrics, makeSuggestion }) => (
  <form
    className={css`
      ${tw(['flex', 'w-full'])};
    `}
    onSubmit={e => {
      makeLyrics(fromCyrilicToLatin(formValue))
      e.preventDefault()
    }}
  >
    <input
      className={css`
        ${tw([
          'border-2',
          'border-white',
          'focus:border-pink',
          'border-solid',
          'flex-1',
          'font-montserrat',
          'outline-none',
          'mt-8',
          'px-8',
          'py-4',
          'rounded-lg',
          'text-list',
          'text-indigo-darkest',
          'uppercase',
        ])};
        background-color: rgba(255, 255, 255, 0.5);
      `}
      onChange={e => makeSuggestion(fromCyrilicToLatin(e.target.value))}
      placeholder="Print some word..."
      type="text"
    />
  </form>
))
