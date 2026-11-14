import * as stylex from '@stylexjs/stylex'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { HomeTabQuery } from '@src/__generated__/HomeTabQuery.graphql'
import { Button } from '@src/components/shared/Button'
import { HomeBanner } from '@src/pages/pageMain/home/HomeBanner'
import { HomeGroupList } from '@src/pages/pageMain/home/HomeGroupList'
import { HomeShortcuts } from '@src/pages/pageMain/home/HomeShortcuts'
import { VerifiedMembers } from '@src/pages/pageMain/home/VerifiedMembers'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { colors, space } from '@src/styles/tokens.stylex'

export function HomeTab() {
  const { push } = useFlow()
  const data = useLazyLoadQuery<HomeTabQuery>(
    graphql`
      query HomeTabQuery {
        ...HomeGroupList_query
      }
    `,
    {},
  )

  return (
    <div {...stylex.props(styles.home)}>
      <HomeBanner />
      <HomeShortcuts />
      <hr {...stylex.props(styles.divider)} />
      <VerifiedMembers />
      <hr {...stylex.props(styles.divider)} />
      <HomeGroupList queryRef={data} />
      <div {...stylex.props(styles.floating)}>
        <Button variant="floating" onClick={() => push(Activity.GROUP_CREATE, {})}>
          유니버스 생성하기
        </Button>
      </div>
    </div>
  )
}

const styles = stylex.create({
  home: {
    width: '90%',
    marginInline: 'auto',
  },
  divider: {
    width: '100%',
    height: '1px',
    marginTop: '17px',
    marginBottom: 0,
    borderStyle: 'none',
    backgroundColor: colors.brandWeak,
  },
  floating: {
    position: 'sticky',
    bottom: space.x4,
    marginTop: space.x6,
  },
})
