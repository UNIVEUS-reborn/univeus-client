import { useActivityParams } from '@stackflow/react'
import { useState } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { GroupEditScreenQuery } from '@src/__generated__/GroupEditScreenQuery.graphql'
import { classifyGroupHostAction } from '@src/components/common/Group/domain/groupHostAction'
import { readGroupHostAction } from '@src/components/common/Group/domain/groupHostAction.relay'
import { GROUP_CATEGORIES } from '@src/components/common/Group/groupLabels'
import { GroupFormFlow } from '@src/components/common/GroupForm/GroupFormFlow'
import { GroupFormResultSheets } from '@src/components/common/GroupForm/GroupFormResultSheets'
import type { GroupFormSubmitValues, GroupFormValues } from '@src/components/common/GroupForm/groupFormValues'
import { CenterMessage } from '@src/components/shared/CenterMessage'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { useUpdateGroup } from '@src/pages/pageGroupEdit/hooks/useUpdateGroup'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { toKstDateAndTime } from '@src/utils/dateTime'

type Group = NonNullable<GroupEditScreenQuery['response']['group']>

export function GroupEditScreen() {
  const { groupId } = useActivityParams<typeof Activity.GROUP_EDIT>()
  const { group } = useLazyLoadQuery<GroupEditScreenQuery>(
    graphql`
      query GroupEditScreenQuery($groupId: ID!) {
        group(groupId: $groupId) {
          id
          title
          content
          category
          meetingAt
          location
          capacity
          participantCount
          participationMethod
          genderRestriction
          images {
            id
            url
          }
          ...groupHostAction_group
        }
      }
    `,
    { groupId },
    { fetchPolicy: 'store-and-network' },
  )

  if (group === null || group === undefined) {
    return <Message>존재하지 않는 유니버스입니다!</Message>
  }

  const hostAction = classifyGroupHostAction(readGroupHostAction(group))
  switch (hostAction.type) {
    case 'MANAGE':
      return <GroupEditForm group={group} />
    case 'CLOSED':
      return <Message>모집이 종료된 유니버스는 수정할 수 없어요.</Message>
    case 'NOT_HOST':
      return <Message>수정 권한이 없어요.</Message>
  }
}

function Message({ children }: { children: string }) {
  return (
    <ScreenLayout>
      <CenterMessage>{children}</CenterMessage>
    </ScreenLayout>
  )
}

function GroupEditForm({ group }: { group: Group }) {
  const { pop } = useFlow()
  const { updateGroup, isInFlight } = useUpdateGroup()
  const [failureMessage, setFailureMessage] = useState('')
  const [isDoneOpen, openDone] = useStepFlowModalState(Activity.GROUP_EDIT, 'done')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.GROUP_EDIT, 'failure')

  const handleSubmit = (values: GroupFormSubmitValues) =>
    updateGroup(group.id, values, {
      onSuccess: openDone,
      onFailure: (message) => {
        setFailureMessage(message)
        openFailure()
      },
    })

  return (
    <>
      <GroupFormFlow
        activityName={Activity.GROUP_EDIT}
        initialValues={toFormValues(group)}
        participantCount={group.participantCount}
        submitting={isInFlight}
        onSubmit={handleSubmit}
      />
      <GroupFormResultSheets
        done={{
          open: isDoneOpen,
          title: '유니버스 수정완료!',
          message: '유니버스가 수정되었어요!',
          onConfirm: () => pop(),
        }}
        failure={{ open: isFailureOpen, message: failureMessage, onClose: closeFailure }}
      />
    </>
  )
}

function toFormValues(group: Group): GroupFormValues {
  const { date, time } = toKstDateAndTime(group.meetingAt)
  return {
    category: GROUP_CATEGORIES.find(({ value }) => value === group.category)?.value ?? null,
    participationMethod: group.participationMethod === '%future added value' ? null : group.participationMethod,
    genderRestriction: group.genderRestriction === '%future added value' ? null : group.genderRestriction,
    capacity: group.capacity,
    date,
    time,
    location: group.location,
    title: group.title,
    content: group.content,
    images: group.images.map(({ id, url }) => ({ id, url, isLocal: false })),
  }
}
