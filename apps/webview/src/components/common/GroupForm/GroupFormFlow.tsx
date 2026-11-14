import { useActivity } from '@stackflow/react'
import { useState } from 'react'

import {
  validateGroupBasics,
  validateGroupContent,
  validateGroupSchedule,
} from '@src/components/common/GroupForm/domain/groupForm'
import type { GroupFormSubmitValues, GroupFormValues } from '@src/components/common/GroupForm/groupFormValues'
import { BasicsStep } from '@src/components/common/GroupForm/steps/BasicsStep'
import { ContentStep } from '@src/components/common/GroupForm/steps/ContentStep'
import { ScheduleStep } from '@src/components/common/GroupForm/steps/ScheduleStep'
import { HeaderTextButton } from '@src/components/shared/HeaderTextButton'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import type { Activity } from '@src/routes/activityNames'
import { useStepFlow } from '@src/stackflow/useStepFlow'

type Props = {
  activityName: typeof Activity.GROUP_CREATE | typeof Activity.GROUP_EDIT
  initialValues: GroupFormValues
  participantCount: number
  submitting: boolean
  onSubmit: (values: GroupFormSubmitValues) => void
}

export function GroupFormFlow({ activityName, initialValues, participantCount, submitting, onSubmit }: Props) {
  const { params } = useActivity()
  const { pushStep, popStep } = useStepFlow(activityName)
  const [values, setValues] = useState(initialValues)
  const [uploading, setUploading] = useState(false)
  const step = params.step === 'schedule' || params.step === 'content' ? params.step : 'basics'

  const handleChange = (next: Partial<GroupFormValues>) => setValues((prev) => ({ ...prev, ...next }))

  const handleBasicsNext = () => {
    if (validateGroupBasics({ ...values, participantCount }).type === 'VALID') {
      pushStep((prev) => ({ ...prev, step: 'schedule' }))
    }
  }

  const handleScheduleNext = () => {
    if (validateGroupSchedule(values, new Date()).type === 'VALID') {
      pushStep((prev) => ({ ...prev, step: 'content' }))
    }
  }

  const handleSubmit = () => {
    const basics = validateGroupBasics({ ...values, participantCount })
    const schedule = validateGroupSchedule(values, new Date())
    const content = validateGroupContent(values)
    if (schedule.type === 'INVALID') {
      popStep()
      return
    }
    if (basics.type === 'INVALID' || content.type === 'INVALID') {
      return
    }
    onSubmit({
      ...basics.value,
      ...schedule.value,
      ...content.value,
      imageIds: values.images.map(({ id }) => id),
    })
  }

  const canSubmit = validateGroupContent(values).type === 'VALID' && !submitting && !uploading

  switch (step) {
    case 'basics':
      return (
        <ScreenLayout title="상세정보 입력">
          <BasicsStep
            values={values}
            participantCount={participantCount}
            onChange={handleChange}
            onNext={handleBasicsNext}
          />
        </ScreenLayout>
      )
    case 'schedule':
      return (
        <ScreenLayout title="상세정보 입력">
          <ScheduleStep values={values} onChange={handleChange} onNext={handleScheduleNext} />
        </ScreenLayout>
      )
    case 'content':
      return (
        <ScreenLayout
          title="소개글 쓰기"
          renderRight={() => (
            <HeaderTextButton disabled={!canSubmit} onClick={handleSubmit}>
              완료
            </HeaderTextButton>
          )}
        >
          <ContentStep
            activityName={activityName}
            values={values}
            onChange={handleChange}
            onUploadingChange={setUploading}
          />
        </ScreenLayout>
      )
  }
}
