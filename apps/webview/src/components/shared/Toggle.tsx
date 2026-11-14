import * as stylex from '@stylexjs/stylex'

import { colors, radius } from '@src/styles/tokens.stylex'

type Props = {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}

export function Toggle({ checked, label, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      {...stylex.props(styles.track, checked && styles.on)}
    >
      <span {...stylex.props(styles.circle, checked && styles.circleOn)} />
    </button>
  )
}

const styles = stylex.create({
  track: {
    position: 'relative',
    width: '44px',
    height: '19px',
    padding: 0,
    borderStyle: 'none',
    borderRadius: '30px',
    backgroundColor: colors.textDisabled,
    transitionProperty: 'background-color',
    transitionDuration: '0.5s',
  },
  on: {
    backgroundColor: colors.brand,
  },
  circle: {
    position: 'absolute',
    top: '1.25px',
    left: '1.5px',
    width: '16.5px',
    height: '16.5px',
    borderRadius: radius.full,
    backgroundColor: colors.background,
    transitionProperty: 'left',
    transitionDuration: '0.5s',
  },
  circleOn: {
    left: '26px',
  },
})
