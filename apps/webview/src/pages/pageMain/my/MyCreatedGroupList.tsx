import { useCallback } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'

import type { MyCreatedGroupList_viewer$key } from '@src/__generated__/MyCreatedGroupList_viewer.graphql'
import type { GroupList } from '@src/pages/pageMain/my/MyGroupList'

export function useMyCreatedGroups(viewerRef: MyCreatedGroupList_viewer$key): GroupList {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment MyCreatedGroupList_viewer on Viewer
      @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "ID" })
      @refetchable(queryName: "MyCreatedGroupListPaginationQuery") {
        createdGroups(first: $first, after: $after) @connection(key: "MyCreatedGroupList_viewer_createdGroups") {
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
    totalCount: data.createdGroups.totalCount,
    nodes: data.createdGroups.edges.map(({ node }) => node),
    hasNext,
    isLoadingNext,
    loadMore,
  }
}
