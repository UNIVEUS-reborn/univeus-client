import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { colors, fontSize, fontWeight } from '@src/styles/tokens.stylex'

export function CenterMessage({ children }: { children: ReactNode }) {
  return <p {...stylex.props(styles.message)}>{children}</p>
}

const styles = stylex.create({
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: 0,
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
})
