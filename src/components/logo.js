/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

import { splitString, uuid } from '../helpers'

const Heading = styled('h1')`
  ${tw(['relative', 'uppercase'])};
  &:after {
    ${tw(['absolute', 'block', 'text-list', 'text-white', 'tracking-wide'])};
    content: 'beta';
    right: calc(1% - 3.5rem);
    top: calc(20% - 0.5rem);
  }
`

export const Logo = () => (
  <Heading>
    <span
      className={css`
        ${tw('font-accio text-heading0 text-white')};
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
)
