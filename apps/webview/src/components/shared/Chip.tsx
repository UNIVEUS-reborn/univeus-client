import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

type Props = {
  selected: boolean
  onClick: () => void
  children: ReactNode
}

export function Chip({ selected, onClick, children }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      {...stylex.props(styles.chip, selected && styles.selected)}
    >
      {children}
    </button>
  )
}

const styles = stylex.create({
  chip: {
    paddingBlock: space.x2,
    paddingInline: space.x4,
    borderStyle: 'none',
    borderRadius: radius.chip,
    backgroundColor: colors.brandWeak,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    fontSize: fontSize.md,
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: colors.brand,
    color: colors.onBrand,
    fontWeight: fontWeight.semibold,
  },
})
