/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { withInterval } from 'kefir'
import { length, pair } from '../helpers'
import { mapPropsStreamWithConfig } from 'recompose'
import kefirConfig from 'recompose/kefirObservableConfig'

const colors = [
  '#e3342f',
  '#f6993f',
  '#ffed4a',
  '#38c172',
  '#4dc0b5',
  '#3490dc',
  '#6574cd',
  '#9561e2',
  '#f66d9b',
]

const StyledBackground = styled('div')`
  ${tw(['absolute', 'pin', 'bg-indigo-darkest'])};
  background: ${({ color }) =>
    'linear-gradient(45deg, ' + color[0] + ' 0%, ' + color[1] + ' 100%)'};
  transition: all 1s ease-in-out;
`

const mapPropsStream = mapPropsStreamWithConfig(kefirConfig)

const enhance = mapPropsStream(props$ => {
  const colorsLength = length(colors) - 1
  let i = 0
  const streem$ = withInterval(2000, emitter => {
    emitter.emit(pair(colors[i], colors[i < colorsLength ? i + 1 : 0]))
    i < colorsLength ? i++ : (i = 0)
  })
  return props$.combine(streem$, (props, color) => ({
    ...props,
    color,
  }))
})

export const Background = enhance(({ color }) => {
  return <StyledBackground {...{ color }} />
})
