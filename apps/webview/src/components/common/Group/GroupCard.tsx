import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { GroupCard_group$key } from '@src/__generated__/GroupCard_group.graphql'
import defaultImage from '@src/assets/group/default_image.png'
import { GenderSticker } from '@src/components/common/Group/GenderSticker'
import { groupCategoryLabel } from '@src/components/common/Group/groupLabels'
import { UserAvatar } from '@src/components/common/User/UserAvatar'
import { CalendarIcon, PeopleIcon } from '@src/components/shared/icons'
import { VerifiedBadge } from '@src/components/shared/VerifiedBadge'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { colors, fontSize, fontWeight, gradient, radius, shadow, space } from '@src/styles/tokens.stylex'
import { formatCardDate, formatCardTime } from '@src/utils/dateTime'

type Props = {
  groupRef: GroupCard_group$key
}

export function GroupCard({ groupRef }: Props) {
  const { push } = useFlow()
  const group = useFragment(
    graphql`
      fragment GroupCard_group on Group {
        _id
        title
        category
        images {
          url
        }
        genderRestriction
        meetingAt
        capacity
        participantCount
        host {
          isVerified
          ...UserAvatar_user
        }
      }
    `,
    groupRef,
  )

  return (
    <button
      type="button"
      onClick={() => push(Activity.GROUP_DETAIL, { groupId: group._id })}
      {...stylex.props(styles.card)}
      style={{ backgroundImage: `url(${group.images[0]?.url ?? defaultImage})` }}
    >
      <span {...stylex.props(styles.overlay)}>
        <span {...stylex.props(styles.stickers)}>
          <GenderSticker genderRestriction={group.genderRestriction} variant="card" />
          <span {...stylex.props(styles.category)}>{groupCategoryLabel(group.category)}</span>
        </span>
        <span {...stylex.props(styles.info)}>
          <span {...stylex.props(styles.profile)}>
            <UserAvatar userRef={group.host} size={32} />
            {group.host.isVerified && (
              <span {...stylex.props(styles.badge)}>
                <VerifiedBadge />
              </span>
            )}
          </span>
          <span {...stylex.props(styles.title)}>{group.title}</span>
          <span {...stylex.props(styles.bottom)}>
            <span {...stylex.props(styles.meta)}>
              <CalendarIcon />
              <span>{formatCardDate(group.meetingAt)}</span>
              <span>{formatCardTime(group.meetingAt)}</span>
            </span>
            <span {...stylex.props(styles.meta)}>
              <PeopleIcon />
              {group.participantCount}/{group.capacity}
            </span>
          </span>
        </span>
      </span>
    </button>
  )
}

const styles = stylex.create({
  card: {
    position: 'relative',
    width: '100%',
    height: '28vh',
    padding: 0,
    borderStyle: 'none',
    borderRadius: radius.md,
    backgroundColor: colors.brandWeak,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: shadow.floating,
    fontFamily: 'inherit',
    textAlign: 'left',
    cursor: 'pointer',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBlock: space.x2,
    paddingInline: '5%',
    borderRadius: radius.md,
    backgroundImage: gradient.cardOverlay,
  },
  stickers: {
    display: 'flex',
    gap: space.x1,
  },
  category: {
    paddingBlock: space.x1,
    paddingInline: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.textPrimary,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.semibold,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x1,
  },
  profile: {
    position: 'relative',
    width: '34px',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
  },
  title: {
    color: colors.onBrand,
    fontSize: fontSize.sm2,
    fontWeight: fontWeight.semibold,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    color: colors.onBrand,
    fontSize: fontSize.xs,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
})
