import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

type Props = {
  progress: number
  label: string
  title?: [string, string]
}

export function GroupFormStepHeader({ progress, label, title }: Props) {
  return (
    <>
      <div {...stylex.props(styles.track)}>
        <div {...stylex.props(styles.fill)} style={{ width: `${progress}%` }} />
      </div>
      <p {...stylex.props(styles.label)}>{label}</p>
      {title !== undefined && (
        <h1 {...stylex.props(styles.title)}>
          {title[0]}
          <br />
          {title[1]}
        </h1>
      )}
    </>
  )
}

const styles = stylex.create({
  track: {
    height: '3px',
    borderRadius: '2px',
    backgroundColor: colors.brandWeak,
  },
  fill: {
    height: '100%',
    borderRadius: '2px',
    backgroundColor: colors.brand,
  },
  label: {
    margin: 0,
    marginTop: space.x2,
    color: colors.textTertiary,
    fontSize: fontSize.sm,
    textAlign: 'right',
  },
  title: {
    marginTop: space.x6,
    marginBottom: '27px',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: '30px',
  },
})
