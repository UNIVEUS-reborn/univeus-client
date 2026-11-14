import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { GroupDetailHost_group$key } from '@src/__generated__/GroupDetailHost_group.graphql'
import { collegeLabel } from '@src/components/common/User/collegeLabel'
import { UserAvatar } from '@src/components/common/User/UserAvatar'
import { VerifiedBadge } from '@src/components/shared/VerifiedBadge'
import { fontSize, fontWeight, space } from '@src/styles/tokens.stylex'
import { formatAdmissionYear } from '@src/utils/dateTime'

type Props = {
  groupRef: GroupDetailHost_group$key
}

export function GroupDetailHost({ groupRef }: Props) {
  const { host } = useFragment(
    graphql`
      fragment GroupDetailHost_group on Group {
        host {
          nickname
          isVerified
          admissionYear
          college
          ...UserAvatar_user
        }
      }
    `,
    groupRef,
  )

  return (
    <div {...stylex.props(styles.host)}>
      <UserAvatar userRef={host} size={54} />
      <div>
        <p {...stylex.props(styles.name)}>
          {host.nickname}
          {host.isVerified && <VerifiedBadge />}
        </p>
        <p {...stylex.props(styles.department)}>
          {formatAdmissionYear(host.admissionYear)} / {collegeLabel(host.college)}
        </p>
      </div>
    </div>
  )
}

const styles = stylex.create({
  host: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x2,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
    margin: 0,
    marginBottom: '6px',
    fontWeight: fontWeight.semibold,
  },
  department: {
    margin: 0,
    fontSize: fontSize.xs,
  },
})
