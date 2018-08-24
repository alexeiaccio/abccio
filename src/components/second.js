import React from 'react'
import { connect } from 'react-redux'

import { AbsoluteContainer, Container } from './container'
import { pick } from '../helpers'
import { ScreenTransitions } from './screenTransitions'
import { Word } from './word'

export const Second = connect(pick(['second']))(({ second }) => (
  <ScreenTransitions inProp={second}>
    <AbsoluteContainer>
      <Container>
        <Word />
      </Container>
    </AbsoluteContainer>
  </ScreenTransitions>
))
