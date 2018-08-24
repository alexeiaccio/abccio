/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { lifecycle } from 'recompose'
import Transition from 'react-transition-group/Transition'

import { Future } from '../helpers'
import { First } from './first'
import { Second } from './second'

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
}

export const App = lifecycle({
  state: { mount: false },
  componentDidMount() {
    Future.after(800, true).value(x => this.setState({ mount: x }))
  },
})(({ mount }) => (
  <Transition in={mount} mountOnEnter timeout={600}>
    {state => (
      <div
        className={css`
          ${tw([
            'flex',
            'h-full',
            'items-center',
            'justify-center',
            'overflow-hidden',
            'relative',
            'w-full',
          ])};
          opacity: 0;
          transition: opacity, ${600}ms ease-in-out;
        `}
        style={{ ...transitionStyles[state] }}
      >
        <First />
        <Second />
      </div>
    )}
  </Transition>
))
