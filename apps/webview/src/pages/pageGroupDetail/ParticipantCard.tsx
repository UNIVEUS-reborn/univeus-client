import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { GroupStatus, GroupViewerRole } from '@src/__generated__/GroupParticipants_group.graphql'
import type { ParticipantCard_participation$key } from '@src/__generated__/ParticipantCard_participation.graphql'
import { collegeLabel } from '@src/components/common/User/collegeLabel'
import { UserAvatar } from '@src/components/common/User/UserAvatar'
import { classifyParticipation } from '@src/pages/pageGroupDetail/domain/participation'
import { colors, fontSize, fontWeight, radius, shadow, space } from '@src/styles/tokens.stylex'
import { formatAdmissionYear } from '@src/utils/dateTime'

type Props = {
  participationRef: ParticipantCard_participation$key
  groupStatus: GroupStatus
  viewerRole: GroupViewerRole
  approving: boolean
  onApprove: (participationId: string) => void
}

export function ParticipantCard({ participationRef, groupStatus, viewerRole, approving, onApprove }: Props) {
  const participation = useFragment(
    graphql`
      fragment ParticipantCard_participation on Participation {
        id
        status
        user {
          nickname
          admissionYear
          college
          ...UserAvatar_user
        }
      }
    `,
    participationRef,
  )
  const display = classifyParticipation({ participationStatus: participation.status, viewerRole, groupStatus })
  const { user } = participation

  return (
    <div {...stylex.props(styles.card, display.type !== 'PARTICIPATING' && styles.pending)}>
      <div {...stylex.props(styles.user)}>
        <UserAvatar userRef={user} size={54} />
        <div>
          <p {...stylex.props(styles.name)}>{user.nickname}</p>
          <p {...stylex.props(styles.department)}>
            {formatAdmissionYear(user.admissionYear)} / {collegeLabel(user.college)}
          </p>
        </div>
      </div>
      <ParticipationStatus display={display.type} approving={approving} onApprove={() => onApprove(participation.id)} />
    </div>
  )
}

type StatusProps = {
  display: ReturnType<typeof classifyParticipation>['type']
  approving: boolean
  onApprove: () => void
}

function ParticipationStatus({ display, approving, onApprove }: StatusProps) {
  switch (display) {
    case 'PARTICIPATING':
      return <span {...stylex.props(styles.situation)}>참여중</span>
    case 'PENDING':
      return <span {...stylex.props(styles.situation)}>대기중</span>
    case 'APPROVABLE':
      return (
        <button type="button" disabled={approving} onClick={onApprove} {...stylex.props(styles.approve)}>
          승인하기
        </button>
      )
    case 'UNKNOWN':
      return null
  }
}

const styles = stylex.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBlock: '9px',
    paddingInline: '11px',
    borderRadius: radius.md,
    backgroundColor: colors.background,
    boxShadow: shadow.card,
  },
  pending: {
    backgroundColor: colors.border,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  name: {
    margin: 0,
    fontWeight: fontWeight.semibold,
  },
  department: {
    margin: 0,
    marginTop: '3px',
    fontSize: fontSize.xs,
  },
  situation: {
    marginRight: '9px',
    color: colors.textTertiary,
    fontWeight: fontWeight.semibold,
  },
  approve: {
    padding: space.x2,
    borderStyle: 'none',
    borderRadius: radius.sm,
    backgroundColor: colors.brand,
    color: colors.onBrand,
    fontFamily: 'inherit',
    fontWeight: fontWeight.semibold,
    ':disabled': {
      backgroundColor: colors.textDisabled,
    },
  },
})
