import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import arrowCircle from '@src/assets/profile/arrow_circle.svg'
import type { AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { Button } from '@src/components/shared/Button'
import {
  validatePhoneNumber,
  validateVerificationCode,
  VERIFICATION_CODE_LENGTH,
} from '@src/pages/pageSignup/domain/identity'
import { useRequestPhoneVerification } from '@src/pages/pageSignup/hooks/useRequestPhoneVerification'
import { useVerifyPhone } from '@src/pages/pageSignup/hooks/useVerifyPhone'
import { SignupStepHeader } from '@src/pages/pageSignup/SignupStepHeader'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'
import { formatPhoneNumber, toDigits } from '@src/utils/phoneNumber'

type PhoneMessage = 'SENT' | 'EMPTY' | 'INVALID_FORMAT'
type CodeMessage = 'VERIFIED' | 'EMPTY' | 'INVALID_FORMAT' | 'MISMATCH'

const PHONE_MESSAGES: Record<PhoneMessage, string> = {
  SENT: '인증번호가 전송되었습니다.',
  EMPTY: '핸드폰 번호를 입력해주세요.',
  INVALID_FORMAT: '올바른 휴대폰 번호 형식을 입력해주세요.',
}

const CODE_MESSAGES: Record<CodeMessage, string> = {
  VERIFIED: '인증번호 확인이 완료되었습니다.',
  EMPTY: '인증번호를 입력하지 않았습니다.',
  INVALID_FORMAT: '인증번호가 일치하지 않습니다.',
  MISMATCH: '인증번호가 일치하지 않습니다.',
}

type Props = {
  onComplete: (destination: AuthDestination) => void
  onFailure: (message: string) => void
}

export function IdentityStep({ onComplete, onFailure }: Props) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [phoneMessage, setPhoneMessage] = useState<PhoneMessage | null>(null)
  const [codeMessage, setCodeMessage] = useState<CodeMessage | null>(null)
  const [nextDestination, setNextDestination] = useState<AuthDestination | null>(null)
  const { requestPhoneVerification, isInFlight: isRequesting } = useRequestPhoneVerification()
  const { verifyPhone, isInFlight: isVerifying } = useVerifyPhone()

  const handleRequest = () => {
    const validated = validatePhoneNumber(phone)
    if (validated.type === 'INVALID') {
      setPhoneMessage(validated.reason)
      return
    }
    requestPhoneVerification(validated.value, {
      onSuccess: () => setPhoneMessage('SENT'),
      onInvalidPhoneNumber: () => setPhoneMessage('INVALID_FORMAT'),
      onFailure,
    })
  }

  const handleVerify = () => {
    const validatedPhone = validatePhoneNumber(phone)
    if (validatedPhone.type === 'INVALID') {
      setPhoneMessage(validatedPhone.reason)
      return
    }
    const validatedCode = validateVerificationCode(code)
    if (validatedCode.type === 'INVALID') {
      setCodeMessage(validatedCode.reason)
      return
    }
    verifyPhone(
      { phoneNumber: validatedPhone.value, code: validatedCode.value },
      {
        onSuccess: (destination) => {
          setCodeMessage('VERIFIED')
          setNextDestination(destination)
        },
        onMismatch: () => setCodeMessage('MISMATCH'),
        onFailure,
      },
    )
  }

  return (
    <div {...stylex.props(styles.body)}>
      <SignupStepHeader
        title="휴대폰 본인인증"
        descriptions={['유니버스 생성 및 신청, 시작일 리마인드 알림을', '문자 메시지로 보내드려요 :)']}
      />
      <div {...stylex.props(styles.form)}>
        <VerificationInput
          label="휴대폰 번호"
          placeholder="010-0000-0000"
          inputMode="tel"
          maxLength={13}
          value={phone}
          disabled={isRequesting || nextDestination !== null}
          message={phoneMessage === null ? null : { text: PHONE_MESSAGES[phoneMessage], ok: phoneMessage === 'SENT' }}
          onChange={(value) => {
            setPhone(formatPhoneNumber(value))
            setPhoneMessage(null)
          }}
          onSubmit={handleRequest}
        />
        <VerificationInput
          label="인증번호"
          placeholder="000000"
          inputMode="numeric"
          maxLength={VERIFICATION_CODE_LENGTH}
          value={code}
          disabled={isVerifying || nextDestination !== null}
          message={codeMessage === null ? null : { text: CODE_MESSAGES[codeMessage], ok: codeMessage === 'VERIFIED' }}
          onChange={(value) => {
            setCode(toDigits(value))
            setCodeMessage(null)
          }}
          onSubmit={handleVerify}
        />
      </div>
      <Button
        variant="floating"
        disabled={nextDestination === null}
        onClick={() => {
          if (nextDestination !== null) {
            onComplete(nextDestination)
          }
        }}
      >
        다음
      </Button>
    </div>
  )
}

type InputProps = {
  label: string
  placeholder: string
  inputMode: 'tel' | 'numeric'
  maxLength: number
  value: string
  disabled: boolean
  message: { text: string; ok: boolean } | null
  onChange: (value: string) => void
  onSubmit: () => void
}

function VerificationInput({
  label,
  placeholder,
  inputMode,
  maxLength,
  value,
  disabled,
  message,
  onChange,
  onSubmit,
}: InputProps) {
  return (
    <label {...stylex.props(styles.inputGroup)}>
      <span {...stylex.props(styles.label)}>{label}</span>
      <input
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...stylex.props(styles.input)}
      />
      <button
        type="button"
        aria-label={`${label} 확인`}
        disabled={disabled}
        onClick={onSubmit}
        {...stylex.props(styles.submit)}
      >
        <img src={arrowCircle} alt="" width={30} height={30} />
      </button>
      {message !== null && <p {...stylex.props(styles.message, message.ok && styles.ok)}>{message.text}</p>}
    </label>
  )
}

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    marginInline: 'auto',
    paddingBottom: space.x6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '85%',
    marginBottom: '51px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textDisabled,
  },
  label: {
    marginBottom: '11px',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  input: {
    width: '100%',
    paddingBlock: '10px',
    borderStyle: 'none',
    outline: 'none',
    color: colors.textTertiary,
    fontFamily: 'inherit',
    fontSize: fontSize.lg2,
    letterSpacing: '2px',
    textAlign: 'center',
    '::placeholder': {
      color: colors.textDisabled,
    },
  },
  submit: {
    position: 'absolute',
    right: 0,
    bottom: space.x2,
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
  message: {
    position: 'absolute',
    bottom: '-20px',
    margin: 0,
    color: colors.danger,
    fontSize: fontSize.sm,
  },
  ok: {
    color: colors.brandStrong,
  },
})
