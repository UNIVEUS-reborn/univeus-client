export type TermsInput = {
  serviceTerms: boolean
  privacyPolicy: boolean
  marketing: boolean
}

export function canAgreeToTerms({
  serviceTerms,
  privacyPolicy,
}: TermsInput): { type: 'ALLOWED' } | { type: 'BLOCKED'; reason: 'REQUIRED_NOT_AGREED' } {
  return serviceTerms && privacyPolicy ? { type: 'ALLOWED' } : { type: 'BLOCKED', reason: 'REQUIRED_NOT_AGREED' }
}
