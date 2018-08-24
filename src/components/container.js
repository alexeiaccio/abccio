/* global tw */
import styled from 'react-emotion'

export const Container = styled('div')`
  ${tw(['flex', 'flex-col', 'items-center'])};
`

export const AbsoluteContainer = styled('div')`
  ${tw(['absolute', 'flex', 'items-center', 'justify-center', 'pin'])};
`
