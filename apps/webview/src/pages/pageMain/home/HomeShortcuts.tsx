import * as stylex from '@stylexjs/stylex'

import fire from '@src/assets/group/fire.svg'
import flag from '@src/assets/group/flag.svg'
import logo from '@src/assets/group/logo3.png'
import money from '@src/assets/group/money.svg'
import necktie from '@src/assets/group/necktie.svg'
import school from '@src/assets/group/school.svg'
import { colors, fontSize, fontWeight, radius, shadow } from '@src/styles/tokens.stylex'

const shortcuts = [
  { icon: logo, label: '취뽀컨텐츠', highlighted: true },
  { icon: school, label: '학교꿀팁', highlighted: false },
  { icon: fire, label: '우리의핫플', highlighted: false },
  { icon: flag, label: '모임장소', highlighted: false },
  { icon: money, label: '정부지원', highlighted: false },
  { icon: necktie, label: '멘토찾기', highlighted: false },
]

export function HomeShortcuts() {
  return (
    <div {...stylex.props(styles.box)}>
      {shortcuts.map(({ icon, label, highlighted }) => (
        <div key={label} {...stylex.props(styles.shortcut, highlighted && styles.highlighted)}>
          <img src={icon} alt={`${label} 아이콘`} width={24} />
          <span {...stylex.props(styles.label, highlighted && styles.highlightedLabel)}>{label}</span>
        </div>
      ))}
    </div>
  )
}

const styles = stylex.create({
  box: {
    display: 'flex',
    columnGap: '10px',
    marginTop: '17px',
  },
  shortcut: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    minHeight: '5.5vh',
    paddingBlock: '5px',
    paddingInline: '7px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: radius.md,
    backgroundColor: colors.background,
    boxShadow: shadow.floating,
  },
  highlighted: {
    borderColor: colors.brand,
  },
  label: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.semibold,
    whiteSpace: 'nowrap',
  },
  highlightedLabel: {
    color: colors.brand,
  },
})
