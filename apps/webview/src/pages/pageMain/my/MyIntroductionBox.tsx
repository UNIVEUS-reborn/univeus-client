import * as stylex from '@stylexjs/stylex'

import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

type Props = {
  hasIntroduction: boolean
}

export function MyIntroductionBox({ hasIntroduction }: Props) {
  const { push } = useFlow()

  const handleClick = () =>
    hasIntroduction ? push(Activity.INTRODUCTION, {}) : push(Activity.INTRODUCTION_EDIT, { from: 'my' })

  return (
    <div {...stylex.props(styles.box)}>
      <div {...stylex.props(styles.text)}>
        <span {...stylex.props(styles.main)}>
          {hasIntroduction ? '나의 N문 N답 보러가기' : 'N문 N답으로 관심도를 높혀볼까요?'}
        </span>
        <span {...stylex.props(styles.sub)}>
          {hasIntroduction ? '추가 N문이 있는지 보러갈까요?' : '유니버스 참여/생성 시 친구들이 볼 수 있어요 :)'}
        </span>
      </div>
      <button type="button" onClick={handleClick} {...stylex.props(styles.button)}>
        CLICK!
      </button>
    </div>
  )
}

const styles = stylex.create({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '11px',
    padding: '13px',
    borderRadius: radius.md,
    backgroundColor: colors.brandWeak,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  main: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  sub: {
    color: colors.textTertiary,
    fontSize: fontSize.xs,
  },
  button: {
    padding: space.x2,
    borderStyle: 'none',
    borderRadius: radius.full,
    backgroundColor: colors.brand,
    color: colors.onBrand,
    fontFamily: 'inherit',
    fontWeight: fontWeight.bold,
  },
})
