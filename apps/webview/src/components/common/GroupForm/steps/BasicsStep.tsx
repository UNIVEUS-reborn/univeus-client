import * as stylex from '@stylexjs/stylex'

import { GROUP_CATEGORIES } from '@src/components/common/Group/groupLabels'
import {
  GROUP_CAPACITY_MAX,
  GROUP_CAPACITY_MIN,
  validateGroupBasics,
  type GenderRestriction,
  type ParticipationMethod,
} from '@src/components/common/GroupForm/domain/groupForm'
import { GroupFormStepHeader } from '@src/components/common/GroupForm/GroupFormStepHeader'
import type { GroupFormValues } from '@src/components/common/GroupForm/groupFormValues'
import { Button } from '@src/components/shared/Button'
import { Chip } from '@src/components/shared/Chip'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

type Props = {
  values: GroupFormValues
  participantCount: number
  onChange: (values: Partial<GroupFormValues>) => void
  onNext: () => void
}

const methods: { value: ParticipationMethod; label: string; description: string }[] = [
  { value: 'AUTO_APPROVAL', label: '자동승인', description: '참여자가 있을시 무조건 승인이에요' },
  { value: 'MANUAL_APPROVAL', label: '수동승인', description: '참여자가 있다면 승인해야해요' },
]

const genders: { value: GenderRestriction; label: string }[] = [
  { value: 'ANY', label: '성별무관' },
  { value: 'MALE_ONLY', label: '남자만' },
  { value: 'FEMALE_ONLY', label: '여자만' },
]

const capacities = Array.from(
  { length: GROUP_CAPACITY_MAX - GROUP_CAPACITY_MIN + 1 },
  (_, index) => GROUP_CAPACITY_MIN + index,
)

export function BasicsStep({ values, participantCount, onChange, onNext }: Props) {
  const result = validateGroupBasics({ ...values, participantCount })

  return (
    <div {...stylex.props(styles.step)}>
      <GroupFormStepHeader progress={30} label="3단계 중 1단계" title={['어떤', '유니버스를 생성하시겠어요?']} />
      <div {...stylex.props(styles.categories)}>
        {GROUP_CATEGORIES.map(({ value, label }) => (
          <Chip key={value} selected={values.category === value} onClick={() => onChange({ category: value })}>
            {label}
          </Chip>
        ))}
      </div>
      <p {...stylex.props(styles.sectionTitle)}>참여방식</p>
      <div {...stylex.props(styles.methods)}>
        {methods.map(({ value, label, description }) => (
          <div key={value} {...stylex.props(styles.method)}>
            <button
              type="button"
              aria-pressed={values.participationMethod === value}
              onClick={() => onChange({ participationMethod: value })}
              {...stylex.props(styles.methodButton, values.participationMethod === value && styles.selected)}
            >
              {label}
            </button>
            <span {...stylex.props(styles.description)}>{description}</span>
          </div>
        ))}
      </div>
      <fieldset {...stylex.props(styles.genders)}>
        <legend {...stylex.props(styles.inlineTitle)}>모집인원</legend>
        {genders.map(({ value, label }) => (
          <label key={value} {...stylex.props(styles.radio, values.genderRestriction === value && styles.checked)}>
            <input
              type="radio"
              name="genderRestriction"
              checked={values.genderRestriction === value}
              onChange={() => onChange({ genderRestriction: value })}
              {...stylex.props(styles.radioInput)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <div {...stylex.props(styles.capacities)}>
        {capacities.map((capacity) => (
          <button
            key={capacity}
            type="button"
            aria-pressed={values.capacity === capacity}
            disabled={capacity < participantCount}
            onClick={() => onChange({ capacity })}
            {...stylex.props(styles.capacity, values.capacity === capacity && styles.capacitySelected)}
          >
            {capacity}
          </button>
        ))}
      </div>
      <div {...stylex.props(styles.next)}>
        <Button variant="floating" disabled={result.type !== 'VALID'} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

const styles = stylex.create({
  step: {
    width: '90%',
    marginInline: 'auto',
    paddingTop: space.x2,
  },
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '14px',
    columnGap: space.x2,
  },
  sectionTitle: {
    marginTop: '27px',
    marginBottom: space.x2,
    fontWeight: fontWeight.bold,
  },
  methods: {
    display: 'flex',
    gap: '18px',
  },
  method: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: space.x1,
  },
  methodButton: {
    height: '36px',
    borderStyle: 'none',
    borderRadius: radius.sm,
    backgroundColor: colors.brandWeak,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  selected: {
    backgroundColor: colors.brand,
    color: colors.onBrand,
  },
  description: {
    color: colors.textTertiary,
    fontSize: fontSize.sm,
  },
  genders: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '29px',
    marginInline: 0,
    padding: 0,
    borderStyle: 'none',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  inlineTitle: {
    float: 'left',
    padding: 0,
    marginRight: '10px',
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  checked: {
    color: colors.brandStrong,
  },
  radioInput: {
    margin: 0,
    accentColor: colors.brandStrong,
  },
  capacities: {
    display: 'flex',
    gap: space.x4,
    marginTop: space.x4,
    marginLeft: space.x2,
  },
  capacity: {
    width: '42px',
    height: '42px',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: colors.brandWeak,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    fontSize: fontSize.lg,
    ':disabled': {
      color: colors.textDisabled,
    },
  },
  capacitySelected: {
    borderColor: colors.brand,
  },
  next: {
    marginTop: '40px',
  },
})
