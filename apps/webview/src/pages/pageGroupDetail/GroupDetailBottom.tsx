import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { space } from '@src/styles/tokens.stylex'

export function GroupDetailBottom({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.bottom)}>{children}</div>
}

const styles = stylex.create({
  bottom: {
    width: '90%',
    marginInline: 'auto',
    paddingBottom: `max(${space.x4}, env(safe-area-inset-bottom))`,
  },
})
