import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import type { AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { validateNickname } from '@src/components/common/User/domain/nickname'
import { NicknameField, type NicknameMessage } from '@src/components/common/User/NicknameField'
import { ProfileImageField, type ProfileImage } from '@src/components/common/User/ProfileImageField'
import { Button } from '@src/components/shared/Button'
import { canRegisterProfile } from '@src/pages/pageSignup/domain/profileRegister'
import { useRegisterProfile } from '@src/pages/pageSignup/hooks/useRegisterProfile'
import { Activity } from '@src/routes/activityNames'
import { colors, fontSize, space } from '@src/styles/tokens.stylex'

type Gender = 'MALE' | 'FEMALE'

const GENDERS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
]

type Props = {
  onComplete: (destination: AuthDestination) => void
  onFailure: (message: string) => void
}

export function ProfileStep({ onComplete, onFailure }: Props) {
  const [nickname, setNickname] = useState('')
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null)
  const [nicknameMessage, setNicknameMessage] = useState<NicknameMessage | null>(null)
  const [image, setImage] = useState<ProfileImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [gender, setGender] = useState<Gender | null>(null)
  const { registerProfile, isInFlight } = useRegisterProfile()
  const canSubmit = canRegisterProfile({ nickname, checkedNickname, gender }).type === 'ALLOWED'

  const handleSubmit = () => {
    const validated = validateNickname(nickname)
    if (validated.type === 'INVALID') {
      setNicknameMessage('INVALID_FORMAT')
      return
    }
    if (!canSubmit || gender === null) {
      return
    }
    registerProfile(
      { nickname: validated.value, gender, profileImageId: image?.id ?? null },
      {
        onSuccess: onComplete,
        onDuplicated: () => {
          setCheckedNickname(null)
          setNicknameMessage('DUPLICATED')
        },
        onInvalid: () => {
          setCheckedNickname(null)
          setNicknameMessage('INVALID_FORMAT')
        },
        onFailure,
      },
    )
  }

  return (
    <div {...stylex.props(styles.body)}>
      <ProfileImageField
        activityName={Activity.SIGNUP}
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
        onCheckFailure={onFailure}
      />
      <fieldset {...stylex.props(styles.genders)}>
        <legend {...stylex.props(styles.legend)}>성별</legend>
        {GENDERS.map(({ value, label }) => (
          <label key={value} {...stylex.props(styles.radio, gender === value && styles.selected)}>
            <input
              type="radio"
              name="gender"
              value={value}
              checked={gender === value}
              onChange={() => setGender(value)}
              {...stylex.props(styles.radioInput)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <Button variant="floating" disabled={!canSubmit || isUploading || isInFlight} onClick={handleSubmit}>
        완료
      </Button>
    </div>
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
  genders: {
    width: '90%',
    marginTop: '-50px',
    marginInline: 'auto',
    marginBottom: '50px',
    padding: 0,
    borderStyle: 'none',
  },
  legend: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '26px',
    color: colors.textPrimary,
    fontSize: fontSize.lg,
  },
  selected: {
    color: colors.brandStrong,
  },
  radioInput: {
    width: '15px',
    marginTop: 0,
    marginLeft: 0,
    marginRight: space.x2,
    accentColor: colors.brandStrong,
  },
})
