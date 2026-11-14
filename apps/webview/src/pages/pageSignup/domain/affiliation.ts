export const STUDENT_ID_LENGTH = 9

export type College =
  | 'HUMANITIES'
  | 'ARTS_AND_PHYSICAL_EDUCATION'
  | 'SOCIAL_SCIENCES'
  | 'SOFTWARE_AND_BUSINESS'
  | 'CONVERGENCE_SCIENCE'
  | 'CREATIVE_ENGINEERING'
  | 'TOURISM_AND_CULTURE'

export const COLLEGES: College[] = [
  'HUMANITIES',
  'ARTS_AND_PHYSICAL_EDUCATION',
  'SOCIAL_SCIENCES',
  'SOFTWARE_AND_BUSINESS',
  'CONVERGENCE_SCIENCE',
  'CREATIVE_ENGINEERING',
  'TOURISM_AND_CULTURE',
]

export type AffiliationInput = {
  college: College | null
  studentId: string
}

export function validateAffiliation({
  college,
  studentId,
}: AffiliationInput):
  | { type: 'VALID'; value: { college: College; studentId: string } }
  | { type: 'INVALID'; reason: 'COLLEGE_REQUIRED' | 'INVALID_STUDENT_ID' } {
  if (college === null) {
    return { type: 'INVALID', reason: 'COLLEGE_REQUIRED' }
  }
  if (!new RegExp(`^\\d{${STUDENT_ID_LENGTH}}$`).test(studentId)) {
    return { type: 'INVALID', reason: 'INVALID_STUDENT_ID' }
  }
  return { type: 'VALID', value: { college, studentId } }
}
