import * as stylex from '@stylexjs/stylex'

import { fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export function IntroductionQuestion({ question }: { question: string }) {
  return (
    <p {...stylex.props(styles.question)}>
      <span aria-hidden {...stylex.props(styles.dot)}>
        ·
      </span>
      {question}
    </p>
  )
}

const styles = stylex.create({
  question: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
    margin: 0,
    marginBottom: '10px',
    fontWeight: fontWeight.light,
  },
  dot: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.black,
    lineHeight: space.x2,
  },
})
