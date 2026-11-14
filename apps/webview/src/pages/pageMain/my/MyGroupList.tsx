import * as stylex from '@stylexjs/stylex'

import type { GroupCard_group$key } from '@src/__generated__/GroupCard_group.graphql'
import { GroupCard } from '@src/components/common/Group/GroupCard'
import { LoadMoreSentinel } from '@src/components/shared/LoadMoreSentinel'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export type GroupList = {
  totalCount: number
  nodes: ReadonlyArray<{ id: string } & GroupCard_group$key>
  hasNext: boolean
  isLoadingNext: boolean
  loadMore: () => void
}

type Props = {
  list: GroupList
  emptyText: string
}

export function MyGroupList({ list, emptyText }: Props) {
  if (list.nodes.length === 0) {
    return <p {...stylex.props(styles.empty)}>{emptyText}</p>
  }
  return (
    <>
      <div {...stylex.props(styles.grid)}>
        {list.nodes.map((node) => (
          <GroupCard key={node.id} groupRef={node} />
        ))}
      </div>
      {list.hasNext && <LoadMoreSentinel loading={list.isLoadingNext} onVisible={list.loadMore} />}
    </>
  )
}

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '8.5%',
    rowGap: space.x5,
    marginTop: space.x4,
  },
  empty: {
    marginTop: space.x8,
    color: colors.textDisabled,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
})
