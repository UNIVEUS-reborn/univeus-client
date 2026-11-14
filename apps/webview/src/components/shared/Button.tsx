import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { colors, fontSize, fontWeight, radius, shadow, size, space } from '@src/styles/tokens.stylex'

type Props = {
  variant: 'floating' | 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
}

export function Button({ variant, disabled = false, onClick, children }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      {...stylex.props(styles.base, styles[variant], disabled && styles.disabled)}
    >
      {children}
    </button>
  )
}

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'none',
    borderRadius: radius.md,
    backgroundColor: colors.brandStrong,
    boxShadow: shadow.floating,
    color: colors.onBrand,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  floating: {
    width: '100%',
    height: size.floatingButtonHeight,
    fontSize: fontSize.md,
  },
  primary: {
    flex: 1,
    paddingBlock: space.x4,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  secondary: {
    flex: 1,
    paddingBlock: space.x4,
    backgroundColor: colors.brandSubtle,
    color: colors.brandBright,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  disabled: {
    backgroundColor: colors.textDisabled,
    color: colors.onBrand,
    cursor: 'default',
  },
})
