import * as stylex from '@stylexjs/stylex'

import { fontSize } from '@src/styles/tokens.stylex'

export function IntroductionTitle() {
  return (
    <h1 {...stylex.props(styles.title)}>
      N문 N답!
      <br />
      간단하게 나를 소개해요 :)
    </h1>
  )
}

const styles = stylex.create({
  title: {
    marginTop: '46px',
    marginBottom: '27px',
    fontSize: fontSize.xxl,
    fontWeight: 'inherit',
    lineHeight: '30px',
  },
})
