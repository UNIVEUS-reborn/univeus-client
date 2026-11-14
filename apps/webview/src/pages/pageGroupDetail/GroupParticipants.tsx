import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { GroupParticipants_group$key } from '@src/__generated__/GroupParticipants_group.graphql'
import { ParticipantCard } from '@src/pages/pageGroupDetail/ParticipantCard'
import { colors, fontWeight, space } from '@src/styles/tokens.stylex'

type Props = {
  groupRef: GroupParticipants_group$key
  approving: boolean
  onApprove: (participationId: string) => void
}

export function GroupParticipants({ groupRef, approving, onApprove }: Props) {
  const group = useFragment(
    graphql`
      fragment GroupParticipants_group on Group {
        status
        viewerRole
        participations {
          id
          ...ParticipantCard_participation
        }
      }
    `,
    groupRef,
  )

  return (
    <section {...stylex.props(styles.section)}>
      <hr {...stylex.props(styles.divider)} />
      <h2 {...stylex.props(styles.heading)}>이런 친구들이 함께해요 !</h2>
      {group.participations.length === 0 ? (
        <p {...stylex.props(styles.empty)}>아직 참여중인 친구가 없어요!</p>
      ) : (
        <div {...stylex.props(styles.list)}>
          {group.participations.map((participation) => (
            <ParticipantCard
              key={participation.id}
              participationRef={participation}
              groupStatus={group.status}
              viewerRole={group.viewerRole}
              approving={approving}
              onApprove={onApprove}
            />
          ))}
        </div>
      )}
    </section>
  )
}

const styles = stylex.create({
  section: {
    paddingBottom: '60px',
  },
  divider: {
    marginTop: 0,
    marginBottom: '19px',
    borderWidth: 0,
    borderTopWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  heading: {
    margin: 0,
    marginBottom: '18px',
    fontSize: 'inherit',
    fontWeight: fontWeight.semibold,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  empty: {
    marginTop: space.x5,
    color: colors.textDisabled,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
})
