import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import arrow from '@src/assets/profile/arrow-thin.svg'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export function SettingsGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section {...stylex.props(styles.group)}>
      {title !== undefined && <h2 {...stylex.props(styles.title)}>{title}</h2>}
      {children}
    </section>
  )
}

type RowProps = {
  label: string
  onClick?: () => void
  right?: ReactNode
}

export function SettingsRow({ label, onClick, right }: RowProps) {
  const content = (
    <>
      <span {...stylex.props(styles.label)}>{label}</span>
      {right ?? <img src={arrow} alt="" width={24} height={24} />}
    </>
  )
  if (right !== undefined) {
    return <div {...stylex.props(styles.row)}>{content}</div>
  }
  return (
    <button type="button" onClick={onClick} {...stylex.props(styles.row, styles.button)}>
      {content}
    </button>
  )
}

const styles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x5,
    marginBottom: space.x8,
  },
  title: {
    margin: 0,
    fontSize: fontSize.lg2,
    fontWeight: fontWeight.bold,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textPrimary,
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  label: {
    fontSize: fontSize.lg,
  },
})
