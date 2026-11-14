import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { UserAvatar_user$key } from '@src/__generated__/UserAvatar_user.graphql'
import personFill from '@src/assets/group/person_fill.svg'
import { colors, radius } from '@src/styles/tokens.stylex'

type Props = {
  userRef: UserAvatar_user$key
  size: number
}

export function UserAvatar({ userRef, size }: Props) {
  const user = useFragment(
    graphql`
      fragment UserAvatar_user on User {
        gender
        profileImage {
          url
        }
      }
    `,
    userRef,
  )

  const imageUrl = user.profileImage?.url

  return (
    <span
      {...stylex.props(styles.box, user.gender === 'MALE' ? styles.male : styles.female)}
      style={{ width: size, height: size }}
    >
      {imageUrl === undefined ? (
        <img src={personFill} alt="" width={size / 2} height={size / 2} />
      ) : (
        <img src={imageUrl} alt="" {...stylex.props(styles.image)} />
      )}
    </span>
  )
}

const styles = stylex.create({
  box: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: radius.full,
    backgroundColor: colors.brandWeak,
  },
  male: {
    borderColor: colors.genderMale,
  },
  female: {
    borderColor: colors.genderFemale,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})
