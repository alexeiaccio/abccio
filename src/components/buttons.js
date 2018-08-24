/* global tw */
import styled, { css } from 'react-emotion'

export const ButtonTemplate = css`
  ${tw([
    'flex',
    'border',
    'border-solid',
    'border-pink',
    'cursor-pointer',
    'font-accio',
    'hover:bg-pink',
    'items-center',
    'justify-center',
    'outline-none',
    'px-4',
    'py-2',
    'rounded-lg',
    'text-xl',
    'uppercase',
    'text-pink',
    'hover:text-white',
  ])};
`

export const Button = css`
  ${tw(['mt-8'])};
`

export const ButtonFilled = styled('button')`
  ${ButtonTemplate};
  ${Button};
  ${tw(['bg-white', 'text-pink'])};
`

export const ButtonOutline = styled('button')`
  ${ButtonTemplate};
  ${Button};
  ${tw(['bg-transparent', 'text-pink'])};
`
