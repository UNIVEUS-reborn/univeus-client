import * as stylex from '@stylexjs/stylex'

import { colors, fontSize } from '@src/styles/tokens.stylex'

export function ChatTab() {
  return <p {...stylex.props(styles.text)}>모임채팅은 준비 중이에요</p>
}

const styles = stylex.create({
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: 0,
    color: colors.textTertiary,
    fontSize: fontSize.md,
  },
})
