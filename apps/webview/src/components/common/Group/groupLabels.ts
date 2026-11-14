export const GROUP_CATEGORIES = [
  { value: 'FREE_PERIOD', label: '우주공강' },
  { value: 'CAREER', label: '스펙쌓기' },
  { value: 'HOBBY_CULTURE', label: '취미/문화' },
  { value: 'HABIT', label: '습관형성' },
  { value: 'FOOD', label: '맛집탐방' },
  { value: 'JOB_HUNTING', label: '취업활동' },
  { value: 'CLASS_FRIEND', label: '수업친구' },
  { value: 'ETC', label: '기타모임' },
] as const

export type GroupCategoryValue = (typeof GROUP_CATEGORIES)[number]['value']

export function groupCategoryLabel(category: string) {
  return GROUP_CATEGORIES.find(({ value }) => value === category)?.label ?? '유니버스'
}
