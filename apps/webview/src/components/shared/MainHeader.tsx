import * as stylex from '@stylexjs/stylex'

import logo from '@src/assets/logo.svg'
import { BellIcon, SearchIcon } from '@src/components/shared/icons'
import { colors, fontSize, fontWeight, space, size } from '@src/styles/tokens.stylex'

export function MainHeaderLogo() {
  return (
    <div {...stylex.props(styles.logo)}>
      <img src={logo} alt="" width={40} height={40} />
      <div>
        <p {...stylex.props(styles.service)}>UNIVE.US</p>
        <p {...stylex.props(styles.school)}>KGU</p>
      </div>
    </div>
  )
}

type ActionsProps = {
  onSearchClick?: () => void
}

export function MainHeaderActions({ onSearchClick }: ActionsProps) {
  return (
    <div {...stylex.props(styles.actions)}>
      <button
        type="button"
        aria-label="검색"
        disabled={onSearchClick === undefined}
        onClick={onSearchClick}
        {...stylex.props(styles.iconButton)}
      >
        <SearchIcon />
      </button>
      <span aria-label="알림" {...stylex.props(styles.icon)}>
        <BellIcon />
      </span>
    </div>
  )
}

const styles = stylex.create({
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  service: {
    margin: 0,
    color: colors.brand,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  school: {
    margin: 0,
    marginTop: space.x1,
    color: colors.textPrimary,
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.medium,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x3,
  },
  iconButton: {
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textPrimary,
  },
  icon: {
    display: 'flex',
    width: size.icon,
    height: size.icon,
    color: colors.textPrimary,
  },
})
