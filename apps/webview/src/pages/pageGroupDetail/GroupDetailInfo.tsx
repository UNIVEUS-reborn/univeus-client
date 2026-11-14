import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { GroupDetailInfo_group$key } from '@src/__generated__/GroupDetailInfo_group.graphql'
import exclamation from '@src/assets/group/exclamation-mark.svg'
import { GenderSticker } from '@src/components/common/Group/GenderSticker'
import { PeopleIcon } from '@src/components/shared/icons'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'
import { formatDeadline, formatMeetingAt } from '@src/utils/dateTime'

type Props = {
  groupRef: GroupDetailInfo_group$key
}

export function GroupDetailSummary({ groupRef }: Props) {
  const group = useGroupDetailInfo(groupRef)
  return (
    <div {...stylex.props(styles.summary)}>
      <span {...stylex.props(styles.people)}>
        <PeopleIcon size={16} />
        {group.participantCount}/{group.capacity}
      </span>
      <GenderSticker genderRestriction={group.genderRestriction} variant="detail" />
    </div>
  )
}

export function GroupDetailSchedule({ groupRef }: Props) {
  const group = useGroupDetailInfo(groupRef)
  return (
    <div {...stylex.props(styles.box)}>
      <p {...stylex.props(styles.deadline)}>
        <img src={exclamation} alt="" width={15} height={14} />
        {formatDeadline(group.recruitDeadlineAt)}
      </p>
      <p {...stylex.props(styles.row)}>
        <span {...stylex.props(styles.label)}>모임 일시</span>
        {formatMeetingAt(group.meetingAt)}
      </p>
      <p {...stylex.props(styles.row)}>
        <span {...stylex.props(styles.label)}>모임 장소</span>
        {group.location}
      </p>
    </div>
  )
}

function useGroupDetailInfo(groupRef: GroupDetailInfo_group$key) {
  return useFragment(
    graphql`
      fragment GroupDetailInfo_group on Group {
        participantCount
        capacity
        genderRestriction
        recruitDeadlineAt
        meetingAt
        location
      }
    `,
    groupRef,
  )
}

const styles = stylex.create({
  summary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: space.x1,
  },
  people: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: fontSize.xs,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x1,
    marginTop: space.x2,
    paddingBlock: space.x2,
    paddingInline: '13px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.textDisabled,
    borderRadius: radius.md,
  },
  deadline: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
    margin: 0,
    color: colors.danger,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  row: {
    margin: 0,
    color: colors.textSecondary,
  },
  label: {
    marginRight: '9px',
    fontWeight: fontWeight.bold,
  },
})
