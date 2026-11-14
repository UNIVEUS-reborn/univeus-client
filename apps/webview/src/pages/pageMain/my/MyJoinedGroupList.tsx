import { useCallback } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'

import type { MyJoinedGroupList_viewer$key } from '@src/__generated__/MyJoinedGroupList_viewer.graphql'
import type { GroupList } from '@src/pages/pageMain/my/MyGroupList'

export function useMyJoinedGroups(viewerRef: MyJoinedGroupList_viewer$key): GroupList {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment MyJoinedGroupList_viewer on Viewer
      @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "ID" })
      @refetchable(queryName: "MyJoinedGroupListPaginationQuery") {
        joinedGroups(first: $first, after: $after) @connection(key: "MyJoinedGroupList_viewer_joinedGroups") {
          totalCount
          edges {
            node {
              id
              ...GroupCard_group
            }
          }
        }
      }
    `,
    viewerRef,
  )
  const loadMore = useCallback(() => {
    if (hasNext && !isLoadingNext) {
      loadNext(10)
    }
  }, [hasNext, isLoadingNext, loadNext])
  return {
    totalCount: data.joinedGroups.totalCount,
    nodes: data.joinedGroups.edges.map(({ node }) => node),
    hasNext,
    isLoadingNext,
    loadMore,
  }
}
