import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import type { AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { collegeLabel } from '@src/components/common/User/collegeLabel'
import { Button } from '@src/components/shared/Button'
import { ChevronDownIcon } from '@src/components/shared/icons'
import {
  COLLEGES,
  STUDENT_ID_LENGTH,
  validateAffiliation,
  type College,
} from '@src/pages/pageSignup/domain/affiliation'
import { useRegisterAffiliation } from '@src/pages/pageSignup/hooks/useRegisterAffiliation'
import { SignupStepHeader } from '@src/pages/pageSignup/SignupStepHeader'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'
import { toDigits } from '@src/utils/phoneNumber'

type Props = {
  onComplete: (destination: AuthDestination) => void
  onFailure: (message: string) => void
}

export function AffiliationStep({ onComplete, onFailure }: Props) {
  const [college, setCollege] = useState<College | null>(null)
  const [studentId, setStudentId] = useState('')
  const { registerAffiliation, isInFlight } = useRegisterAffiliation()
  const validated = validateAffiliation({ college, studentId })

  const handleNext = () => {
    if (validated.type === 'INVALID') {
      return
    }
    registerAffiliation(validated.value, { onSuccess: onComplete, onFailure })
  }

  return (
    <div {...stylex.props(styles.body)}>
      <SignupStepHeader
        title="경기대 소속등록"
        descriptions={[
          '유니버스는 유저간의 신뢰를 바탕으로 해요.',
          '불건전한 언행을 방지하고 건전한 모임문화를 위해 필요해요.',
        ]}
      />
      <div {...stylex.props(styles.form)}>
        <label {...stylex.props(styles.inputGroup)}>
          <span {...stylex.props(styles.label)}>학과</span>
          <span {...stylex.props(styles.selectWrapper)}>
            <select
              value={college ?? ''}
              onChange={(event) => setCollege(COLLEGES.find((value) => value === event.target.value) ?? null)}
              {...stylex.props(styles.input, styles.select, college === null && styles.placeholder)}
            >
              <option value="" disabled>
                소속 학부를 선택해주세요.
              </option>
              {COLLEGES.map((value) => (
                <option key={value} value={value}>
                  {collegeLabel(value)}
                </option>
              ))}
            </select>
            <span {...stylex.props(styles.chevron)}>
              <ChevronDownIcon />
            </span>
          </span>
        </label>
        <label {...stylex.props(styles.inputGroup)}>
          <span {...stylex.props(styles.label)}>학번</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="전체 학번을 입력해 주세요"
            maxLength={STUDENT_ID_LENGTH}
            value={studentId}
            onChange={(event) => setStudentId(toDigits(event.target.value))}
            {...stylex.props(styles.input)}
          />
        </label>
        <p {...stylex.props(styles.notice)}>허위 학번을 입력 할 시 서비스 이용에 제제가 있을 수 있습니다.</p>
      </div>
      <Button variant="floating" disabled={validated.type === 'INVALID' || isInFlight} onClick={handleNext}>
        다음
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
    paddingBottom: space.x6,
  },
  form: {
    width: '85%',
    marginInline: 'auto',
    paddingBottom: '72px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    marginTop: space.x6,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textDisabled,
  },
  label: {
    fontWeight: fontWeight.semibold,
  },
  selectWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '25px',
    paddingBottom: space.x1,
    borderStyle: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: colors.textTertiary,
    fontFamily: 'inherit',
    fontSize: fontSize.lg2,
    '::placeholder': {
      color: colors.textDisabled,
    },
  },
  select: {
    paddingInline: 0,
    appearance: 'none',
  },
  placeholder: {
    color: colors.textDisabled,
  },
  chevron: {
    position: 'absolute',
    right: '5px',
    display: 'flex',
    color: colors.textTertiary,
    pointerEvents: 'none',
  },
  notice: {
    marginTop: '5px',
    marginBottom: 0,
    color: colors.dangerWeak,
    fontSize: fontSize.sm,
  },
})
