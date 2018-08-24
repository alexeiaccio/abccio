import React from 'react'
import { css } from 'react-emotion'
import Transition from 'react-transition-group/Transition'

const transitionStyles = {
  enter: {
    opacity: 0,
    transform: 'scale(0.1)',
  },
  entering: {
    opacity: 0,
    transform: 'scale(0.1)',
  },
  entered: {
    opacity: 1,
    transform: 'scale(1)',
  },
  exiting: {
    opacity: 1,
    transform: 'scale(5)',
  },
  exited: {
    opacity: 0,
    transform: 'scale(10)',
  },
}

export const ScreenTransitions = ({ children, inProp }) => (
  <Transition appear in={inProp} mountOnEnter timeout={600} unmountOnExit>
    {state => (
      <div
        className={css`
          opacity: 0;
          transform: scale(0.1);
          transition: opacity, transform ${600}ms ease-in-out;
        `}
        style={{ ...transitionStyles[state] }}
      >
        {children}
      </div>
    )}
  </Transition>
)
