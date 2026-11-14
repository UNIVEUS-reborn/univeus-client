import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight } from '@src/styles/tokens.stylex'

type Props = {
  title: string
  descriptions: string[]
}

export function SignupStepHeader({ title, descriptions }: Props) {
  return (
    <header {...stylex.props(styles.header)}>
      <h1 {...stylex.props(styles.title)}>{title}</h1>
      {descriptions.map((description) => (
        <p key={description} {...stylex.props(styles.description)}>
          {description}
        </p>
      ))}
    </header>
  )
}

const styles = stylex.create({
  header: {
    marginTop: '40px',
    marginBottom: '22px',
  },
  title: {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
  },
  description: {
    marginTop: '5px',
    marginBottom: 0,
    color: colors.textTertiary,
    fontSize: fontSize.md,
  },
})
