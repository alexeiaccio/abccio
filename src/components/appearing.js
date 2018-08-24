import React from 'react'
import { css } from 'react-emotion'
import Transition from 'react-transition-group/Transition'

const transitionStyles = {
  entering: {
    maxHeight: 0,
    opacity: 0,
    transform: 'translateY(-20px)',
  },
  entered: {
    maxHeight: 9999,
    opacity: 1,
    transform: 'translateY(0px)',
  },
}

export const Appearing = ({ children }) => (
  <Transition appear in mountOnEnter timeout={400}>
    {state => (
      <div
        className={css`
          max-height: 0;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity, transform ${400}ms ease-in-out;
        `}
        style={{ ...transitionStyles[state] }}
      >
        {children}
      </div>
    )}
  </Transition>
)
