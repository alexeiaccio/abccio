/* global tw */
import React from 'react'
import styled, { css, keyframes } from 'react-emotion'
import { withInterval } from 'kefir'
import Transition from 'react-transition-group/Transition'

import { assoc, length, mapPropsStream, pair, uuid } from '../helpers'

const colorSet = [
  ['#e3342f', '#f6993f'],
  ['#f6993f', '#ffed4a'],
  ['#ffed4a', '#38c172'],
  ['#38c172', '#4dc0b5'],
  ['#4dc0b5', '#3490dc'],
  ['#3490dc', '#6574cd'],
  ['#6574cd', '#9561e2'],
  ['#9561e2', '#f66d9b'],
  ['#f66d9b', '#e3342f'],
]

const animation = {
  0: keyframes`
    from, to {
      opacity: .99
    }
  `,
  1: keyframes`
    from {
      opacity: .01
    }
    to {
      opacity: .99
    }
  `,
}

const StyledBackground = styled('div')`
  ${tw(['h-full', 'w-full'])};
  animation: ${({ i }) => animation[i]} 12000ms linear;
`

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
}

const enhance = mapPropsStream(props$ => {
  let i = 0
  const colorSetLength = length(colorSet) - 1
  const colorStreem = withInterval(12000, emitter => {
    emitter.emit(pair(colorSet[i], colorSet[i < colorSetLength ? i + 1 : 0]))
    i < colorSetLength ? i++ : (i = 0)
  })
  const streemWithDefault = colorStreem.toProperty(() =>
    pair(colorSet[colorSetLength - 1], colorSet[0])
  )
  return props$.combine(streemWithDefault, (props, colors) =>
    assoc('colors', colors, props)
  )
})

export const Background = enhance(({ colors }) => (
  <Transition appear in mountOnEnter timeout={800}>
    {state => (
      <div
        className={css`
          ${tw(['fixed', 'pin'])};
          opacity: 0;
          transition: opacity, ${800}ms ease-in-out;
        `}
        style={{ ...transitionStyles[state] }}
      >
        {colors.map((color, i) => (
          <StyledBackground
            {...{ i }}
            key={uuid()}
            style={{
              background: `linear-gradient(45deg, ${color[0]} 0%, ${
                color[1]
              } 100%)`,
            }}
          />
        ))}
      </div>
    )}
  </Transition>
))
