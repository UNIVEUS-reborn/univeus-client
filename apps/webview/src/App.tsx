import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight } from '@src/styles/tokens.stylex'

export default function App() {
  return <div {...stylex.props(styles.root)}>UNIVE.US</div>
}

const styles = stylex.create({
  root: {
    color: colors.brand,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
})
