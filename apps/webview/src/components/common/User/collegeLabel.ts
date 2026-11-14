const COLLEGE_LABELS: Record<string, string> = {
  HUMANITIES: '인문대학',
  ARTS_AND_PHYSICAL_EDUCATION: '예술체육대학',
  SOCIAL_SCIENCES: '사회과학대학',
  SOFTWARE_AND_BUSINESS: '소프트웨어경영대학',
  CONVERGENCE_SCIENCE: '융합과학대학',
  CREATIVE_ENGINEERING: '창의공과대학',
  TOURISM_AND_CULTURE: '관광문화대학',
}

export function collegeLabel(college: string) {
  return Object.hasOwn(COLLEGE_LABELS, college) ? COLLEGE_LABELS[college] : ''
}
