import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'
import { graphql, useFragment } from 'react-relay'

import type { UserProfileCard_user$key } from '@src/__generated__/UserProfileCard_user.graphql'
import { collegeLabel } from '@src/components/common/User/collegeLabel'
import { UserAvatar } from '@src/components/common/User/UserAvatar'
import { colors, fontSize, fontWeight, radius, shadow, space } from '@src/styles/tokens.stylex'
import { formatAdmissionYear } from '@src/utils/dateTime'

type Props = {
  userRef: UserProfileCard_user$key
  right?: ReactNode
  children?: ReactNode
}

export function UserProfileCard({ userRef, right, children }: Props) {
  const user = useFragment(
    graphql`
      fragment UserProfileCard_user on User {
        nickname
        admissionYear
        college
        ...UserAvatar_user
      }
    `,
    userRef,
  )

  return (
    <section {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.top)}>
        <UserAvatar userRef={user} size={54} />
        <div {...stylex.props(styles.text)}>
          <p {...stylex.props(styles.name)}>{user.nickname}</p>
          <p {...stylex.props(styles.department)}>
            {formatAdmissionYear(user.admissionYear)} / {collegeLabel(user.college)}
          </p>
        </div>
        {right !== undefined && <div {...stylex.props(styles.right)}>{right}</div>}
      </div>
      {children}
    </section>
  )
}

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: space.x4,
    paddingTop: '19px',
    paddingInline: '19px',
    paddingBottom: '13px',
    borderRadius: radius.md,
    backgroundColor: colors.background,
    boxShadow: shadow.floating,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
    paddingBottom: '6px',
  },
  text: {
    flex: 1,
  },
  name: {
    margin: 0,
    marginBottom: space.x2,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  department: {
    margin: 0,
    fontSize: fontSize.sm2,
    fontWeight: fontWeight.medium,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
})
