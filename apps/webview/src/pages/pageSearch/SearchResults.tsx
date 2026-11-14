import { graphql, useLazyLoadQuery } from 'react-relay'

import type { SearchResultsQuery } from '@src/__generated__/SearchResultsQuery.graphql'
import { SearchGroupList } from '@src/pages/pageSearch/SearchGroupList'

type Props = {
  query: string
}

export function SearchResults({ query }: Props) {
  const data = useLazyLoadQuery<SearchResultsQuery>(
    graphql`
      query SearchResultsQuery($query: String!) {
        ...SearchGroupList_query @arguments(query: $query)
      }
    `,
    { query },
    { fetchPolicy: 'store-and-network' },
  )

  return <SearchGroupList queryRef={data} />
}
