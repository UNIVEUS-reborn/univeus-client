import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { ProfileEditScreenQuery } from '@src/__generated__/ProfileEditScreenQuery.graphql'
import { validateNickname } from '@src/components/common/User/domain/nickname'
import { NicknameField, type NicknameMessage } from '@src/components/common/User/NicknameField'
import { ProfileImageField, type ProfileImage } from '@src/components/common/User/ProfileImageField'
import { Button } from '@src/components/shared/Button'
import { RequestFailureSheet } from '@src/components/shared/RequestFailureSheet'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { canSaveProfile } from '@src/pages/pageProfileEdit/domain/profileSave'
import { useUpdateProfile } from '@src/pages/pageProfileEdit/hooks/useUpdateProfile'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { space } from '@src/styles/tokens.stylex'

export function ProfileEditScreen() {
  const { pop } = useFlow()
  const { viewer } = useLazyLoadQuery<ProfileEditScreenQuery>(
    graphql`
      query ProfileEditScreenQuery {
        viewer {
          user {
            id
            nickname
            profileImage {
              id
              url
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' },
  )
  const originalNickname = viewer.user.nickname
  const [nickname, setNickname] = useState(originalNickname)
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null)
  const [nicknameMessage, setNicknameMessage] = useState<NicknameMessage | null>(null)
  const [image, setImage] = useState<ProfileImage | null>(() =>
    viewer.user.profileImage === null || viewer.user.profileImage === undefined
      ? null
      : { ...viewer.user.profileImage, isLocal: false },
  )
  const [isUploading, setIsUploading] = useState(false)
  const [failureMessage, setFailureMessage] = useState('')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.PROFILE_EDIT, 'failure')
  const { updateProfile, isInFlight } = useUpdateProfile()

  const canSave = canSaveProfile({ originalNickname, nickname, checkedNickname }).type === 'ALLOWED'

  const handleSubmit = () => {
    const validated = validateNickname(nickname)
    if (!canSave || validated.type === 'INVALID') {
      setNicknameMessage('INVALID_FORMAT')
      return
    }
    updateProfile(
      { nickname: validated.value, profileImageId: image?.id ?? null },
      {
        onSuccess: () => pop(),
        onDuplicated: () => {
          setCheckedNickname(null)
          setNicknameMessage('DUPLICATED')
        },
        onInvalid: () => {
          setCheckedNickname(null)
          setNicknameMessage('INVALID_FORMAT')
        },
        onFailure: (message) => {
          setFailureMessage(message)
          openFailure()
        },
      },
    )
  }

  return (
    <ScreenLayout title="프로필 변경">
      <div {...stylex.props(styles.body)}>
        <ProfileImageField
          activityName={Activity.PROFILE_EDIT}
          image={image}
          onChange={setImage}
          onUploadingChange={setIsUploading}
        />
        <NicknameField
          nickname={nickname}
          message={nicknameMessage}
          onChange={(next) => {
            setNickname(next)
            setNicknameMessage(null)
          }}
          onChecked={(checked, message) => {
            setNicknameMessage(message)
            setCheckedNickname(message === 'AVAILABLE' ? checked : null)
          }}
          onCheckFailure={(message) => {
            setFailureMessage(message)
            openFailure()
          }}
        />
        <Button variant="floating" disabled={!canSave || isUploading || isInFlight} onClick={handleSubmit}>
          완료
        </Button>
      </div>
      <RequestFailureSheet open={isFailureOpen} message={failureMessage} onClose={closeFailure} />
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    marginInline: 'auto',
    paddingTop: '50px',
    paddingBottom: space.x6,
  },
})
