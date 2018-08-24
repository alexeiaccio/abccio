import React from 'react'
import { connect } from 'react-redux'

import { AbsoluteContainer, Container } from './container'
import { pick } from '../helpers'
import { Input } from './input'
import { Logo } from './logo'
import { ScreenTransitions } from './screenTransitions'
import { Suggestions } from './suggestions'

export const First = connect(pick(['first']))(({ first }) => (
  <ScreenTransitions inProp={first}>
    <AbsoluteContainer>
      <Container>
        <Logo />
        <Input />
        <Suggestions />
      </Container>
    </AbsoluteContainer>
  </ScreenTransitions>
))
