import { useActivityParams } from '@stackflow/react'
import * as stylex from '@stylexjs/stylex'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { GroupDetailScreenQuery } from '@src/__generated__/GroupDetailScreenQuery.graphql'
import calendarBlue from '@src/assets/group/calendar-blue.svg'
import { classifyGroupHostAction } from '@src/components/common/Group/domain/groupHostAction'
import { readGroupHostAction } from '@src/components/common/Group/domain/groupHostAction.relay'
import { groupCategoryLabel } from '@src/components/common/Group/groupLabels'
import { CenterMessage } from '@src/components/shared/CenterMessage'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { GroupDetailBody } from '@src/pages/pageGroupDetail/GroupDetailBody'
import { GroupDetailHost } from '@src/pages/pageGroupDetail/GroupDetailHost'
import { GroupDetailSchedule, GroupDetailSummary } from '@src/pages/pageGroupDetail/GroupDetailInfo'
import { GroupDetailSheets } from '@src/pages/pageGroupDetail/GroupDetailSheets'
import { GroupHostButton } from '@src/pages/pageGroupDetail/GroupHostButton'
import { useGroupDetailSheets } from '@src/pages/pageGroupDetail/hooks/useGroupDetailSheets'
import type { Activity } from '@src/routes/activityNames'
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
          : undefined
      }
      bottom={<GroupHostButton hostAction={hostAction} onManage={sheets.manageSheet.open} />}
    >
      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.top)}>
          <GroupDetailHost groupRef={group} />
          <GroupDetailSummary groupRef={group} />
        </div>
        <GroupDetailSchedule groupRef={group} />
        <GroupDetailBody groupRef={group} />
      </div>
      <GroupDetailSheets sheets={sheets} />
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
