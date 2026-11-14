import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import logo from '@src/assets/auth/landingpage_logo.svg'
import { requestGoogleIdToken } from '@src/components/common/Auth/googleIdToken'
import { useAuthNavigation } from '@src/components/common/Auth/useAuthNavigation'
import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { RequestFailureSheet } from '@src/components/shared/RequestFailureSheet'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { GoogleSignInButton } from '@src/pages/pageLanding/GoogleSignInButton'
import { useSignInWithGoogle } from '@src/pages/pageLanding/hooks/useSignInWithGoogle'
import { LandingKeywords } from '@src/pages/pageLanding/LandingKeywords'
import { NETWORK_ERROR_MESSAGE } from '@src/relay/mutationError'
import { Activity } from '@src/routes/activityNames'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export function LandingScreen() {
  const navigate = useAuthNavigation()
  const { signIn, isInFlight } = useSignInWithGoogle()
  const [isRequestingToken, setIsRequestingToken] = useState(false)
  const [failureMessage, setFailureMessage] = useState('')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.LANDING, 'failure')
  const [isNotUniversityOpen, openNotUniversity, closeNotUniversity] = useStepFlowModalState(
    Activity.LANDING,
    'not-university',
  )

  const showFailure = (message: string) => {
    setFailureMessage(message)
    openFailure()
  }

  const handleGoogleSignIn = async () => {
    setIsRequestingToken(true)
    try {
      const googleIdToken = await requestGoogleIdToken()
      signIn(googleIdToken, {
        onSuccess: navigate,
        onNotUniversityEmail: openNotUniversity,
        onFailure: showFailure,
      })
    } catch (error) {
      showFailure(error instanceof Error ? error.message : NETWORK_ERROR_MESSAGE)
    } finally {
      setIsRequestingToken(false)
    }
  }

  return (
    <ScreenLayout title="회원가입•간편로그인">
      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.logo)}>
          <img src={logo} alt="" />
        </div>
        <LandingKeywords />
        <div {...stylex.props(styles.title)}>
          <p {...stylex.props(styles.titleText)}>
            우리 학교 <strong {...stylex.props(styles.mate)}>MATE</strong>가 필요할 때
          </p>
          <p {...stylex.props(styles.univeus)}>UNIVE.US</p>
        </div>
        <div {...stylex.props(styles.login)}>
          <GoogleSignInButton loading={isRequestingToken || isInFlight} onClick={handleGoogleSignIn} />
        </div>
      </div>
      <BottomSheet
        open={isNotUniversityOpen}
        onClose={closeNotUniversity}
        title="경기대 e-mail이 아닙니다!"
        actions={
          <Button variant="floating" onClick={closeNotUniversity}>
            확인
          </Button>
        }
      >
        <p {...stylex.props(styles.sheetText)}>경기대 e-mail만 이용이 가능합니다.</p>
        <p {...stylex.props(styles.sheetText)}>경기대 e-mail로 접속해주세요.</p>
      </BottomSheet>
      <RequestFailureSheet open={isFailureOpen} message={failureMessage} onClose={closeFailure} />
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%',
    paddingBottom: space.x8,
    isolation: 'isolate',
  },
  logo: {
    position: 'absolute',
    top: '212px',
    zIndex: -1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    width: '100%',
    marginTop: '105px',
    textAlign: 'center',
  },
  titleText: {
    margin: 0,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
  },
  mate: {
    color: colors.brandStrong,
    fontWeight: fontWeight.bold,
  },
  univeus: {
    marginTop: '5px',
    marginBottom: 0,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '126px',
  },
  sheetText: {
    margin: 0,
    color: colors.textTertiary,
  },
})
