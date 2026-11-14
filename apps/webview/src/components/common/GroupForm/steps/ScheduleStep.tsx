import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import exclamation from '@src/assets/group/exclamation-mark.svg'
import { GROUP_LOCATION_MAX_LENGTH, validateGroupSchedule } from '@src/components/common/GroupForm/domain/groupForm'
import { GroupFormStepHeader } from '@src/components/common/GroupForm/GroupFormStepHeader'
import type { GroupFormValues } from '@src/components/common/GroupForm/groupFormValues'
import { Button } from '@src/components/shared/Button'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'
import { toKstToday } from '@src/utils/dateTime'

type Props = {
  values: GroupFormValues
  onChange: (values: Partial<GroupFormValues>) => void
  onNext: () => void
}

export function ScheduleStep({ values, onChange, onNext }: Props) {
  const [now] = useState(() => new Date())
  const result = validateGroupSchedule(values, now)

  return (
    <div {...stylex.props(styles.step)}>
      <GroupFormStepHeader progress={60} label="3단계 중 2단계" title={['유니버스의', '모임정보를 작성해주세요 :)']} />
      <div {...stylex.props(styles.dateRow)}>
        <label {...stylex.props(styles.field)}>
          <span {...stylex.props(styles.fieldTitle)}>모임 날짜</span>
          <input
            type="date"
            min={toKstToday(now)}
            value={values.date}
            onChange={(event) => onChange({ date: event.target.value })}
            {...stylex.props(styles.dateInput)}
          />
        </label>
        <label {...stylex.props(styles.field)}>
          <span {...stylex.props(styles.fieldTitle)}>모임 시간</span>
          <input
            type="time"
            value={values.time}
            onChange={(event) => onChange({ time: event.target.value })}
            {...stylex.props(styles.dateInput)}
          />
        </label>
      </div>
      <p {...stylex.props(styles.warning)}>
        <img src={exclamation} alt="" width={15} height={14} />
        모임 시간 3시간 전에 자동 마감됩니다.
      </p>
      {result.type === 'INVALID' && result.reason === 'MEETING_TOO_SOON' && (
        <p {...stylex.props(styles.warning)}>모임 시간은 지금부터 3시간 이후로 정해주세요.</p>
      )}
      <label {...stylex.props(styles.location)}>
        <span {...stylex.props(styles.fieldTitle)}>모임위치</span>
        <input
          type="text"
          maxLength={GROUP_LOCATION_MAX_LENGTH}
          placeholder="모임 할 장소를 정해 주세요"
          value={values.location}
          onChange={(event) => onChange({ location: event.target.value })}
          {...stylex.props(styles.locationInput)}
        />
      </label>
      <p {...stylex.props(styles.example)}>ex) 이스퀘어 앞, 5강의동 벤치 앞</p>
      <Button variant="floating" disabled={result.type !== 'VALID'} onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

const styles = stylex.create({
  step: {
    width: '90%',
    marginInline: 'auto',
    paddingTop: space.x2,
  },
  dateRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '17px',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
  },
  fieldTitle: {
    fontWeight: fontWeight.bold,
  },
  dateInput: {
    height: '35px',
    paddingInline: '5px',
    boxSizing: 'border-box',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.textDisabled,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    outlineColor: colors.brandStrong,
    fontFamily: 'inherit',
    fontSize: fontSize.md,
  },
  warning: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
    marginTop: space.x2,
    marginBottom: 0,
    color: colors.danger,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  location: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '27px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textDisabled,
  },
  locationInput: {
    paddingTop: '13px',
    paddingBottom: '10px',
    paddingInline: 0,
    borderStyle: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: fontSize.md,
    '::placeholder': {
      color: colors.placeholder,
    },
  },
  example: {
    marginTop: '5px',
    marginBottom: '72px',
    color: colors.textTertiary,
    fontSize: fontSize.sm,
  },
})
