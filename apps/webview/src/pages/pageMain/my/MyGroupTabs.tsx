import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import type { MyCreatedGroupList_viewer$key } from '@src/__generated__/MyCreatedGroupList_viewer.graphql'
import type { MyJoinedGroupList_viewer$key } from '@src/__generated__/MyJoinedGroupList_viewer.graphql'
import { useMyCreatedGroups } from '@src/pages/pageMain/my/MyCreatedGroupList'
import { MyGroupList } from '@src/pages/pageMain/my/MyGroupList'
import { useMyJoinedGroups } from '@src/pages/pageMain/my/MyJoinedGroupList'
import { colors, fontSize, fontWeight } from '@src/styles/tokens.stylex'

type Props = {
  viewerRef: MyCreatedGroupList_viewer$key & MyJoinedGroupList_viewer$key
}

export function MyGroupTabs({ viewerRef }: Props) {
  const [tab, setTab] = useState<'created' | 'joined'>('created')
  const created = useMyCreatedGroups(viewerRef)
  const joined = useMyJoinedGroups(viewerRef)

  const tabs = [
    { key: 'created', label: `생성 유니버스(${created.totalCount})` },
    { key: 'joined', label: `참여 유니버스(${joined.totalCount})` },
  ] as const

  return (
    <>
      <div role="tablist" {...stylex.props(styles.tabs)}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            {...stylex.props(styles.tab, tab === key && styles.selected)}
          >
            {label}
            <span {...stylex.props(styles.underline, tab === key && styles.selectedUnderline)} />
          </button>
        ))}
      </div>
      {tab === 'created' ? (
        <MyGroupList list={created} emptyText="생성한 유니버스가 없습니다!" />
      ) : (
        <MyGroupList list={joined} emptyText="참여한 유니버스가 없습니다!" />
      )}
    </>
  )
}

const styles = stylex.create({
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '28px',
    marginBottom: '23px',
  },
  tab: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: '7px',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textDisabled,
    fontFamily: 'inherit',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  selected: {
    color: colors.textPrimary,
  },
  underline: {
    width: '100%',
    height: '1px',
    backgroundColor: colors.textDisabled,
  },
  selectedUnderline: {
    backgroundColor: colors.brandStrong,
  },
})
