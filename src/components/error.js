/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'

import { hasLength, pick } from '../helpers'

export const Error = connect(pick(['error']))(
  ({ error }) =>
    hasLength(error) && (
      <p
        className={css`
          ${tw([
            'fixed',
            'pin-b',
            'pin-l',
            'pin-r',
            'text-center',
            'text-red',
          ])};
        `}
      >
        {error}
      </p>
    )
)
