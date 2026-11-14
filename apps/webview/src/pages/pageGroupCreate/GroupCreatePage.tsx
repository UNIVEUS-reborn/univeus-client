import { useActivityParams } from '@stackflow/react'
import { useEffect, useState } from 'react'

import { GroupFormFlow } from '@src/components/common/GroupForm/GroupFormFlow'
import { GroupFormResultSheets } from '@src/components/common/GroupForm/GroupFormResultSheets'
import { emptyGroupFormValues, type GroupFormSubmitValues } from '@src/components/common/GroupForm/groupFormValues'
import { useCreateGroup } from '@src/pages/pageGroupCreate/hooks/useCreateGroup'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'

export function GroupCreatePage() {
  const { replace } = useFlow()
  const { step } = useActivityParams<typeof Activity.GROUP_CREATE>()
  const { createGroup, isInFlight } = useCreateGroup()
  const [createdGroupId, setCreatedGroupId] = useState<string | null>(null)
  const [failureMessage, setFailureMessage] = useState('')
  const [isDoneOpen, openDone] = useStepFlowModalState(Activity.GROUP_CREATE, 'done')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.GROUP_CREATE, 'failure')

  const [initialStep] = useState(step)

  useEffect(() => {
    if (initialStep !== undefined) {
      replace(Activity.GROUP_CREATE, {}, { animate: false })
    }
  }, [initialStep, replace])

  const handleSubmit = (values: GroupFormSubmitValues) =>
    createGroup(values, {
      onSuccess: (groupId) => {
        setCreatedGroupId(groupId)
        openDone()
      },
      onFailure: (message) => {
        setFailureMessage(message)
        openFailure()
      },
    })

  const handleDone = () => {
    if (createdGroupId !== null) {
      replace(Activity.GROUP_DETAIL, { groupId: createdGroupId })
    }
  }

  return (
    <>
      <GroupFormFlow
        activityName={Activity.GROUP_CREATE}
        initialValues={emptyGroupFormValues}
        participantCount={0}
        submitting={isInFlight}
        onSubmit={handleSubmit}
      />
      <GroupFormResultSheets
        done={{
          open: isDoneOpen,
          title: '유니버스 생성완료!',
          message: '유니버스가 제대로 생성되었어요!\n모임정보를 꼭 기억해주세요!',
          onConfirm: handleDone,
        }}
        failure={{ open: isFailureOpen, message: failureMessage, onClose: closeFailure }}
      />
    </>
  )
}
