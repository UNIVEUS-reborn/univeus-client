import * as stylex from '@stylexjs/stylex'
import { useCallback, useState, useTransition } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'

import type { HomeGroupList_query$key } from '@src/__generated__/HomeGroupList_query.graphql'
import { GroupCard } from '@src/components/common/Group/GroupCard'
import { GROUP_CATEGORIES, type GroupCategoryValue } from '@src/components/common/Group/groupLabels'
import { LoadMoreSentinel } from '@src/components/shared/LoadMoreSentinel'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

type Props = {
  queryRef: HomeGroupList_query$key
}

const tabs = [{ value: null, label: '전체보기' }, ...GROUP_CATEGORIES]
const tabRows = [tabs.slice(0, 5), tabs.slice(5)]

export function HomeGroupList({ queryRef }: Props) {
  const [category, setCategory] = useState<GroupCategoryValue | null>(null)
  const [isPending, startTransition] = useTransition()
  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment(
    graphql`
      fragment HomeGroupList_query on Query
      @argumentDefinitions(
        category: { type: "GroupCategory" }
        first: { type: "Int", defaultValue: 10 }
        after: { type: "ID" }
      )
      @refetchable(queryName: "HomeGroupListPaginationQuery") {
        groups(category: $category, first: $first, after: $after)
          @connection(key: "HomeGroupList_query_groups", filters: ["category"]) {
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

  const handleCategoryChange = (next: GroupCategoryValue | null) => {
    setCategory(next)
    startTransition(() => {
      refetch({ category: next }, { fetchPolicy: 'store-or-network' })
    })
  }

  const handleLoadMore = useCallback(() => {
    if (hasNext && !isLoadingNext) {
      loadNext(10)
    }
  }, [hasNext, isLoadingNext, loadNext])

  return (
    <section {...stylex.props(styles.section)}>
      <h2 {...stylex.props(styles.heading)}>어떤 행성을 찾아볼까요?</h2>
      <div {...stylex.props(styles.tabs)}>
        {tabRows.map((row, rowIndex) => (
          <div key={rowIndex} {...stylex.props(styles.tabRow)}>
            {row.map(({ value, label }) => (
              <button
                key={label}
                type="button"
                aria-pressed={value === category}
                onClick={() => handleCategoryChange(value)}
                {...stylex.props(styles.tab, value === category && styles.selectedTab)}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </div>
      {data.groups.edges.length === 0 ? (
        <p {...stylex.props(styles.empty)}>일치하는 항목이 없습니다.</p>
      ) : (
        <div {...stylex.props(styles.grid, isPending && styles.pending)}>
          {data.groups.edges.map(({ node }) => (
            <GroupCard key={node.id} groupRef={node} />
          ))}
        </div>
      )}
      {hasNext && <LoadMoreSentinel loading={isLoadingNext} onVisible={handleLoadMore} />}
    </section>
  )
}

const styles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: space.x2,
  },
  heading: {
    margin: 0,
    marginBottom: space.x4,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  tabs: {
    overflow: 'hidden',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.sm,
  },
  tabRow: {
    display: 'flex',
  },
  tab: {
    flex: 1,
    paddingBlock: space.x3,
    paddingInline: 0,
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    fontSize: fontSize.md,
    whiteSpace: 'nowrap',
  },
  selectedTab: {
    backgroundColor: colors.brand,
    color: colors.onBrand,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '8.5%',
    rowGap: space.x5,
    marginTop: space.x8,
  },
  pending: {
    opacity: 0.5,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
    margin: 0,
    color: colors.textTertiary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
})
