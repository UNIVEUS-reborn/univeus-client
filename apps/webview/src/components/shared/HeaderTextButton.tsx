import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { colors, fontSize, fontWeight } from '@src/styles/tokens.stylex'

type Props = {
  disabled: boolean
  onClick: () => void
  children: ReactNode
}

export function HeaderTextButton({ disabled, onClick, children }: Props) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} {...stylex.props(styles.button)}>
      {children}
    </button>
  )
}

const styles = stylex.create({
  button: {
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: {
      default: colors.brandStrong,
      ':disabled': colors.textDisabled,
    },
    fontFamily: 'inherit',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
})
