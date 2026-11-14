import * as stylex from '@stylexjs/stylex'
import { useState, type ReactNode } from 'react'

import checkIcon from '@src/assets/auth/check.svg'
import checkedIcon from '@src/assets/auth/redcheck.svg'
import type { AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { Button } from '@src/components/shared/Button'
import { canAgreeToTerms, type TermsInput } from '@src/pages/pageSignup/domain/terms'
import { useAgreeToTerms } from '@src/pages/pageSignup/hooks/useAgreeToTerms'
import { SignupStepHeader } from '@src/pages/pageSignup/SignupStepHeader'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

const TERMS: { key: keyof TermsInput; label: string; required: boolean; url: string }[] = [
  {
    key: 'serviceTerms',
    label: '이용약관 동의',
    required: true,
    url: 'https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a',
  },
  {
    key: 'privacyPolicy',
    label: '개인정보 제공 및 활용 동의',
    required: true,
    url: 'https://univeus.oopy.io/4f621393-467a-4e61-b8f8-76ada7cc9b99',
  },
  {
    key: 'marketing',
    label: '문자 수신 동의',
    required: false,
    url: 'https://univeus.oopy.io/6157f35b-c400-4cc5-baa5-235de47b255a',
  },
]

type Props = {
  onComplete: (destination: AuthDestination) => void
  onFailure: (message: string) => void
}

export function TermsStep({ onComplete, onFailure }: Props) {
  const [terms, setTerms] = useState<TermsInput>({ serviceTerms: false, privacyPolicy: false, marketing: false })
  const { agreeToTerms, isInFlight } = useAgreeToTerms()
  const isAllChecked = terms.serviceTerms && terms.privacyPolicy && terms.marketing
  const canSubmit = canAgreeToTerms(terms).type === 'ALLOWED'

  const handleToggleAll = () =>
    setTerms({ serviceTerms: !isAllChecked, privacyPolicy: !isAllChecked, marketing: !isAllChecked })

  const handleNext = () => {
    if (!canSubmit) {
      return
    }
    agreeToTerms(terms, { onSuccess: onComplete, onFailure })
  }

  return (
    <div {...stylex.props(styles.body)}>
      <SignupStepHeader
        title="유니버스 이용약관"
        descriptions={['유니버스를 이용하기위해 동의해야하는 항목이에요 :)', '건강한 모임문화를 위해 동의가 필요해요.']}
      />
      <div {...stylex.props(styles.agreements)}>
        <CheckLine checked={isAllChecked} onToggle={handleToggleAll}>
          <span {...stylex.props(styles.allText)}>약관 전체동의</span>
        </CheckLine>
        <hr {...stylex.props(styles.divider)} />
        <ul {...stylex.props(styles.list)}>
          {TERMS.map(({ key, label, required, url }) => (
            <li key={key} {...stylex.props(styles.item)}>
              <CheckLine checked={terms[key]} onToggle={() => setTerms((prev) => ({ ...prev, [key]: !prev[key] }))}>
                <span {...stylex.props(styles.itemText)}>
                  {label}
                  {required && <span {...stylex.props(styles.required)}>*</span>}
                </span>
              </CheckLine>
              <a href={url} target="_blank" rel="noreferrer" {...stylex.props(styles.link)}>
                보기
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div {...stylex.props(styles.next)}>
        <Button variant="floating" disabled={!canSubmit || isInFlight} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

type CheckLineProps = {
  checked: boolean
  onToggle: () => void
  children: ReactNode
}

function CheckLine({ checked, onToggle, children }: CheckLineProps) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} onClick={onToggle} {...stylex.props(styles.checkLine)}>
      <img src={checked ? checkedIcon : checkIcon} alt="" width={18} height={18} />
      {children}
    </button>
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
  agreements: {
    width: '95%',
    marginInline: 'auto',
    paddingTop: '18px',
  },
  checkLine: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '17px',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textPrimary,
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  allText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  divider: {
    marginTop: space.x3,
    marginBottom: 0,
    borderWidth: 0,
    borderTopWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: colors.textDisabled,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: space.x4,
    marginTop: space.x4,
    marginBottom: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: fontSize.sm2,
    fontWeight: fontWeight.medium,
  },
  required: {
    marginLeft: '3px',
    color: colors.danger,
    fontSize: fontSize.xl,
  },
  link: {
    color: colors.textTertiary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    textDecoration: 'none',
  },
  next: {
    marginTop: '69px',
  },
})
