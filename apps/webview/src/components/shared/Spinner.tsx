import * as stylex from '@stylexjs/stylex'

import { colors, radius, size, space } from '@src/styles/tokens.stylex'

export function Spinner() {
  return (
    <div role="status" aria-label="불러오는 중" {...stylex.props(styles.wrapper)}>
      <span {...stylex.props(styles.spinner)} />
    </div>
  )
}

const spin = stylex.keyframes({
  to: { transform: 'rotate(360deg)' },
})

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: space.x6,
  },
  spinner: {
    width: size.icon,
    height: size.icon,
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: colors.brandWeak,
    borderTopColor: colors.brand,
    borderRadius: radius.full,
    animationName: spin,
    animationDuration: '0.8s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
})
