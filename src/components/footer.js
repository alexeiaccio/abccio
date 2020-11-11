/* global tw */
import React from 'react'
import { css } from 'react-emotion'

export const Footer = () => (
  <footer
    className={css`
      ${tw([
        'absolute',
        'border',
        'border-solid',
        'border-white',
        'p-q24',
        'pin-b',
        'pin-l',
        'pin-r',
      ])};
    `}
  >
    Accio
  </footer>
)
