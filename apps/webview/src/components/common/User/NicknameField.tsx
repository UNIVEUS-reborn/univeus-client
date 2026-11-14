import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import checkIcon from '@src/assets/profile/arrow_circle.svg'
import { NICKNAME_MAX_LENGTH, validateNickname } from '@src/components/common/User/domain/nickname'
import { useCheckNickname } from '@src/components/common/User/useCheckNickname'
import { NETWORK_ERROR_MESSAGE } from '@src/relay/mutationError'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export type NicknameMessage = 'AVAILABLE' | 'DUPLICATED' | 'INVALID_FORMAT'

type Props = {
  nickname: string
  message: NicknameMessage | null
  onChange: (nickname: string) => void
  onChecked: (nickname: string, message: NicknameMessage) => void
  onCheckFailure: (message: string) => void
}

export function NicknameField({ nickname, message, onChange, onChecked, onCheckFailure }: Props) {
  const checkNickname = useCheckNickname()
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = async () => {
    const validated = validateNickname(nickname)
    if (validated.type === 'INVALID') {
      onChecked(nickname, 'INVALID_FORMAT')
      return
    }
    setIsChecking(true)
    try {
      const availability = await checkNickname(validated.value)
      switch (availability) {
        case 'AVAILABLE':
        case 'DUPLICATED':
        case 'INVALID_FORMAT':
          onChecked(nickname, availability)
          return
        case '%future added value':
          onCheckFailure(NETWORK_ERROR_MESSAGE)
          return
      }
    } catch {
      onCheckFailure(NETWORK_ERROR_MESSAGE)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div {...stylex.props(styles.form)}>
      <div {...stylex.props(styles.inputGroup)}>
        <input
          type="text"
          maxLength={NICKNAME_MAX_LENGTH}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(event) => onChange(event.target.value)}
          {...stylex.props(styles.input)}
        />
        <button
          type="button"
          aria-label="닉네임 중복 확인"
          disabled={isChecking}
          onClick={handleCheck}
          {...stylex.props(styles.check)}
        >
          <img src={checkIcon} alt="" width={30} height={30} />
        </button>
      </div>
      <NicknameMessageText message={message} />
    </div>
  )
}

function NicknameMessageText({ message }: { message: NicknameMessage | null }) {
  switch (message) {
    case 'AVAILABLE':
      return <p {...stylex.props(styles.message, styles.available)}>사용 가능한 닉네임입니다.</p>
    case 'DUPLICATED':
      return <p {...stylex.props(styles.message)}>중복된 닉네임입니다.</p>
    case 'INVALID_FORMAT':
      return <p {...stylex.props(styles.message)}>올바르지 않은 형식입니다. (글자수 2~13자, 특수문자 미포함)</p>
    case null:
      return <p {...stylex.props(styles.message)} />
  }
}

const styles = stylex.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    marginInline: 'auto',
    paddingBottom: '78px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginTop: '22px',
    marginBottom: space.x2,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textDisabled,
  },
  input: {
    flex: 1,
    paddingBottom: '10px',
    paddingLeft: '5px',
    borderStyle: 'none',
    outline: 'none',
    color: colors.textTertiary,
    fontFamily: 'inherit',
    fontSize: fontSize.lg2,
    '::placeholder': {
      color: colors.textDisabled,
    },
  },
  check: {
    display: 'flex',
    marginBottom: space.x2,
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
  message: {
    minHeight: '18px',
    margin: 0,
    color: colors.danger,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  available: {
    color: colors.brandStrong,
  },
})
