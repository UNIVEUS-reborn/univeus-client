import * as stylex from '@stylexjs/stylex'
import type { ComponentType } from 'react'

import { colors, fontSize, size, space } from '@src/styles/tokens.stylex'

export type BottomNavItem<Key extends string> = {
  key: Key
  label: string
  Icon: ComponentType<{ size?: number }>
}

type Props<Key extends string> = {
  items: BottomNavItem<Key>[]
  current: Key
  onChange: (key: Key) => void
}

export function BottomNav<Key extends string>({ items, current, onChange }: Props<Key>) {
  return (
    <nav {...stylex.props(styles.nav)}>
      {items.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          aria-current={key === current ? 'page' : undefined}
          onClick={() => onChange(key)}
          {...stylex.props(styles.item, key === current && styles.active)}
        >
          <Icon />
          <span {...stylex.props(styles.label)}>{label}</span>
        </button>
      ))}
    </nav>
  )
}

const styles = stylex.create({
  nav: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: size.bottomNavHeight,
    paddingBottom: `max(${space.x2}, env(safe-area-inset-bottom))`,
    backgroundColor: colors.background,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.x1,
    width: '20%',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textDisabled,
  },
  active: {
    color: colors.textSecondary,
  },
  label: {
    fontSize: fontSize.sm,
  },
})
