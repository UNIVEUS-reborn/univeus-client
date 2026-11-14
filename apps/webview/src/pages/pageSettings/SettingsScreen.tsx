import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { SettingsScreenQuery } from '@src/__generated__/SettingsScreenQuery.graphql'
import { UserProfileCard } from '@src/components/common/User/UserProfileCard'
import { RequestFailureSheet } from '@src/components/shared/RequestFailureSheet'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { Toggle } from '@src/components/shared/Toggle'
import { useSignOut } from '@src/pages/pageSettings/hooks/useSignOut'
import { useUpdateMarketingAgreement } from '@src/pages/pageSettings/hooks/useUpdateMarketingAgreement'
import { SettingsGroup, SettingsRow } from '@src/pages/pageSettings/SettingsMenu'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, space } from '@src/styles/tokens.stylex'

const INSTAGRAM_URL = 'https://www.instagram.com/unive.us'

export function SettingsScreen() {
  const { push } = useFlow()
  const { viewer } = useLazyLoadQuery<SettingsScreenQuery>(
    graphql`
      query SettingsScreenQuery {
        viewer {
          id
          marketingAgreed
          user {
            ...UserProfileCard_user
          }
        }
      }
    `,
    {},
  )
  const updateMarketingAgreement = useUpdateMarketingAgreement()
  const [failureMessage, setFailureMessage] = useState('')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.SETTINGS, 'failure')

  const { signOut, isInFlight: isSigningOut } = useSignOut()

  const showFailure = (message: string) => {
    setFailureMessage(message)
    openFailure()
  }

  const handleMarketingToggle = (agreed: boolean) => updateMarketingAgreement(viewer.id, agreed, showFailure)

  const handleSignOut = () => {
    if (!isSigningOut) {
      signOut(showFailure)
    }
  }

  return (
    <ScreenLayout title="설정">
      <div {...stylex.props(styles.body)}>
        <UserProfileCard userRef={viewer.user} />
        <div {...stylex.props(styles.menu)}>
          <SettingsGroup title="프로필 설정">
            <SettingsRow label="프로필 변경" onClick={() => push(Activity.PROFILE_EDIT, {})} />
          </SettingsGroup>
          <SettingsGroup title="멤버쉽 관리">
            <SettingsRow label="결제수단 관리" />
          </SettingsGroup>
          <SettingsGroup title="이용약관">
            <SettingsRow label="서비스 이용약관" />
            <SettingsRow label="개인정보 이용동의 및 활용 약관" />
            <SettingsRow
              label="문자 및 마케팅 수신동의"
              right={
                <Toggle
                  checked={viewer.marketingAgreed}
                  label="문자 및 마케팅 수신동의"
                  onChange={handleMarketingToggle}
                />
              }
            />
          </SettingsGroup>
          <SettingsGroup title="CONTACT">
            <SettingsRow label="인스타그램" onClick={() => window.open(INSTAGRAM_URL, '_blank')} />
            <SettingsRow label="문의하기" />
          </SettingsGroup>
          <hr {...stylex.props(styles.divider)} />
          <SettingsGroup>
            <SettingsRow label="로그아웃" onClick={handleSignOut} />
            <SettingsRow label="회원탈퇴" />
          </SettingsGroup>
        </div>
      </div>
      <RequestFailureSheet open={isFailureOpen} message={failureMessage} onClose={closeFailure} />
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    width: '90%',
    marginInline: 'auto',
    paddingBottom: space.x8,
  },
  menu: {
    marginTop: '35px',
    marginLeft: '5px',
  },
  divider: {
    marginTop: 0,
    marginBottom: '23px',
    borderWidth: 0,
    borderTopWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.textDisabled,
  },
})
