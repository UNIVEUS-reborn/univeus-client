import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { GroupDetailBody_group$key } from '@src/__generated__/GroupDetailBody_group.graphql'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

type Props = {
  groupRef: GroupDetailBody_group$key
}

export function GroupDetailBody({ groupRef }: Props) {
  const group = useFragment(
    graphql`
      fragment GroupDetailBody_group on Group {
        title
        content
        images {
          id
          url
        }
      }
    `,
    groupRef,
  )

  return (
    <>
      <div {...stylex.props(styles.content)}>
        <h1 {...stylex.props(styles.title)}>{group.title}</h1>
        <p {...stylex.props(styles.text)}>{group.content}</p>
      </div>
      {group.images.length > 0 && (
        <div {...stylex.props(styles.images)}>
          {group.images.map((image) => (
            <img key={image.id} src={image.url} alt="" {...stylex.props(styles.image)} />
          ))}
        </div>
      )}
    </>
  )
}

const styles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: space.x4,
    color: colors.textSecondary,
  },
  title: {
    margin: 0,
    marginBottom: space.x6,
    fontSize: fontSize.lg2,
    fontWeight: fontWeight.bold,
  },
  text: {
    margin: 0,
    marginBottom: '25px',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
  },
  images: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    marginBottom: space.x8,
  },
  image: {
    flexShrink: 0,
    width: '43vw',
    height: '30vh',
    objectFit: 'cover',
    borderRadius: radius.chip,
  },
})
