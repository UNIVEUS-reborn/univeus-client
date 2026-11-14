import { useActivityParams } from '@stackflow/react'
import * as stylex from '@stylexjs/stylex'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { GroupDetailScreenQuery } from '@src/__generated__/GroupDetailScreenQuery.graphql'
import calendarBlue from '@src/assets/group/calendar-blue.svg'
import declaration from '@src/assets/profile/declaration.svg'
import { classifyGroupHostAction } from '@src/components/common/Group/domain/groupHostAction'
import { readGroupHostAction } from '@src/components/common/Group/domain/groupHostAction.relay'
import { groupCategoryLabel } from '@src/components/common/Group/groupLabels'
import { ReportSheet } from '@src/components/common/Report/ReportSheet'
import { CenterMessage } from '@src/components/shared/CenterMessage'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { classifyGroupJoinAction } from '@src/pages/pageGroupDetail/domain/groupJoinAction'
import { readGroupJoinAction } from '@src/pages/pageGroupDetail/domain/groupJoinAction.relay'
import { GroupDetailBody } from '@src/pages/pageGroupDetail/GroupDetailBody'
import { GroupDetailHost } from '@src/pages/pageGroupDetail/GroupDetailHost'
import { GroupDetailSchedule, GroupDetailSummary } from '@src/pages/pageGroupDetail/GroupDetailInfo'
import { GroupDetailSheets } from '@src/pages/pageGroupDetail/GroupDetailSheets'
import { GroupHostButton } from '@src/pages/pageGroupDetail/GroupHostButton'
import { GroupJoinButton } from '@src/pages/pageGroupDetail/GroupJoinButton'
import { GroupParticipants } from '@src/pages/pageGroupDetail/GroupParticipants'
import { useGroupDetailSheets } from '@src/pages/pageGroupDetail/hooks/useGroupDetailSheets'
import { useParticipationSheets } from '@src/pages/pageGroupDetail/hooks/useParticipationSheets'
import { ParticipationSheets } from '@src/pages/pageGroupDetail/ParticipationSheets'
import { Activity } from '@src/routes/activityNames'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { space } from '@src/styles/tokens.stylex'

export function GroupDetailScreen() {
  const { groupId } = useActivityParams<typeof Activity.GROUP_DETAIL>()
  const { group } = useLazyLoadQuery<GroupDetailScreenQuery>(
    graphql`
      query GroupDetailScreenQuery($groupId: ID!) {
        group(groupId: $groupId) {
          id
          category
          ...groupHostAction_group
          ...GroupDetailHost_group
          ...GroupDetailInfo_group
          ...GroupDetailBody_group
          ...groupJoinAction_group
          ...GroupParticipants_group
        }
      }
    `,
    { groupId },
    { fetchPolicy: 'store-and-network' },
  )

  if (group === null || group === undefined) {
    return (
      <ScreenLayout>
        <CenterMessage>존재하지 않는 유니버스입니다!</CenterMessage>
      </ScreenLayout>
    )
  }

  return <GroupDetailContent group={group} groupId={groupId} />
}

type ContentProps = {
  group: NonNullable<GroupDetailScreenQuery['response']['group']>
  groupId: string
}

function GroupDetailContent({ group, groupId }: ContentProps) {
  const hostAction = classifyGroupHostAction(readGroupHostAction(group))
  const sheets = useGroupDetailSheets({ id: group.id, groupId, category: group.category })
  const participationSheets = useParticipationSheets({ id: group.id, showFailure: sheets.showFailure })
  const joinAction = classifyGroupJoinAction(readGroupJoinAction(group))
  const [isReportOpen, openReport, closeReport] = useStepFlowModalState(Activity.GROUP_DETAIL, 'report')

  return (
    <ScreenLayout
      title={groupCategoryLabel(group.category)}
      renderRight={
        hostAction.type === 'MANAGE'
          ? () => (
              <button
                type="button"
                aria-label="유니버스 상태 변경"
                onClick={sheets.closeSheet.open}
                {...stylex.props(styles.icon)}
              >
                <img src={calendarBlue} alt="" width={24} height={24} />
              </button>
            )
          : hostAction.type === 'NOT_HOST'
            ? () => (
                <button type="button" aria-label="게시글 신고" onClick={openReport} {...stylex.props(styles.icon)}>
                  <img src={declaration} alt="" width={22} height={21} />
                </button>
              )
            : undefined
      }
      bottom={
        hostAction.type === 'NOT_HOST' ? (
          <GroupJoinButton
            joinAction={joinAction}
            joining={participationSheets.isJoining}
            onJoin={participationSheets.handleJoin}
            onCancel={participationSheets.handleCancelRequest}
          />
        ) : (
          <GroupHostButton hostAction={hostAction} onManage={sheets.manageSheet.open} />
        )
      }
    >
      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.top)}>
          <GroupDetailHost groupRef={group} />
          <GroupDetailSummary groupRef={group} />
        </div>
        <GroupDetailSchedule groupRef={group} />
        <GroupDetailBody groupRef={group} />
        <GroupParticipants
          groupRef={group}
          approving={participationSheets.isApproving}
          onApprove={participationSheets.handleApprove}
        />
      </div>
      <GroupDetailSheets sheets={sheets} />
      <ParticipationSheets sheets={participationSheets} />
      <ReportSheet open={isReportOpen} title="게시글을 신고하시겠어요?" onClose={closeReport} />
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    width: '90%',
    marginInline: 'auto',
    paddingBottom: space.x6,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '14px',
  },
  icon: {
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
})
