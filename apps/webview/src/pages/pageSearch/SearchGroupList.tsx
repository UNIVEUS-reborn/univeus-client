import * as stylex from '@stylexjs/stylex'
import { useCallback } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'

import type { SearchGroupList_query$key } from '@src/__generated__/SearchGroupList_query.graphql'
import { GroupCard } from '@src/components/common/Group/GroupCard'
import { LoadMoreSentinel } from '@src/components/shared/LoadMoreSentinel'
import { colors, fontSize, space } from '@src/styles/tokens.stylex'

type Props = {
  queryRef: SearchGroupList_query$key
}

export function SearchGroupList({ queryRef }: Props) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment SearchGroupList_query on Query
      @argumentDefinitions(query: { type: "String!" }, first: { type: "Int", defaultValue: 10 }, after: { type: "ID" })
      @refetchable(queryName: "SearchGroupListPaginationQuery") {
        searchGroups(query: $query, first: $first, after: $after)
          @connection(key: "SearchGroupList_query_searchGroups", filters: ["query"]) {
          edges {
            node {
              id
              ...GroupCard_group
            }
          }
        }
      }
    `,
    queryRef,
  )

  const handleLoadMore = useCallback(() => {
    if (hasNext && !isLoadingNext) {
      loadNext(10)
    }
  }, [hasNext, isLoadingNext, loadNext])

  if (data.searchGroups.edges.length === 0) {
    return <p {...stylex.props(styles.empty)}>찾으시는 검색 결과가 없습니다.</p>
  }

  return (
    <>
      <div {...stylex.props(styles.grid)}>
        {data.searchGroups.edges.map(({ node }) => (
          <GroupCard key={node.id} groupRef={node} />
        ))}
      </div>
      {hasNext && <LoadMoreSentinel loading={isLoadingNext} onVisible={handleLoadMore} />}
    </>
  )
}

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '8.5%',
    rowGap: space.x5,
    marginTop: space.x8,
  },
  empty: {
    marginTop: '100px',
    color: colors.textTertiary,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
})
