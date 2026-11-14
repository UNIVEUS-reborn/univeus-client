import type { TermsInput } from '@src/pages/pageSignup/domain/terms'

export const requiredAgreed: TermsInput = {
  serviceTerms: true,
  privacyPolicy: true,
  marketing: false,
}
