import * as stylex from '@stylexjs/stylex'

import googleIcon from '@src/assets/auth/google.svg'
import { Spinner } from '@src/components/shared/Spinner'
import { colors, fontSize, fontWeight, radius, shadow } from '@src/styles/tokens.stylex'

type Props = {
  loading: boolean
  onClick: () => void
}

export function GoogleSignInButton({ loading, onClick }: Props) {
  return (
    <button type="button" disabled={loading} onClick={onClick} {...stylex.props(styles.button)}>
      <img src={googleIcon} alt="" width={24} height={24} {...stylex.props(styles.icon)} />
      {loading ? <Spinner /> : '구글 소셜로그인'}
    </button>
  )
}

const styles = stylex.create({
  button: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '47px',
    borderStyle: 'none',
    borderRadius: radius.full,
    backgroundColor: colors.background,
    boxShadow: shadow.floating,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    cursor: 'pointer',
  },
  icon: {
    position: 'absolute',
    left: '15px',
  },
})
