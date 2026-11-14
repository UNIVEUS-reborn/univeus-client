import * as stylex from '@stylexjs/stylex'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { MyTabQuery } from '@src/__generated__/MyTabQuery.graphql'
import settingIcon from '@src/assets/profile/setting.svg'
import { UserProfileCard } from '@src/components/common/User/UserProfileCard'
import { VerifiedBadge } from '@src/components/shared/VerifiedBadge'
import { MyGroupTabs } from '@src/pages/pageMain/my/MyGroupTabs'
import { MyIntroductionBox } from '@src/pages/pageMain/my/MyIntroductionBox'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export function MyTab() {
  const { push } = useFlow()
  const { viewer } = useLazyLoadQuery<MyTabQuery>(
    graphql`
      query MyTabQuery {
        viewer {
          id
          user {
            isVerified
            introduction {
              __typename
            }
            ...UserProfileCard_user
          }
          ...MyCreatedGroupList_viewer
          ...MyJoinedGroupList_viewer
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' },
  )

  return (
    <div {...stylex.props(styles.my)}>
      <UserProfileCard
        userRef={viewer.user}
        right={
          <button
            type="button"
            aria-label="설정"
            onClick={() => push(Activity.SETTINGS, {})}
            {...stylex.props(styles.iconButton)}
          >
            <img src={settingIcon} alt="" width={24} height={24} />
          </button>
        }
      >
        {viewer.user.isVerified && (
          <p {...stylex.props(styles.beta)}>
            BETA TESTER
            <VerifiedBadge />
          </p>
        )}
        <MyIntroductionBox
          hasIntroduction={viewer.user.introduction !== null && viewer.user.introduction !== undefined}
        />
      </UserProfileCard>
      <MyGroupTabs viewerRef={viewer} />
    </div>
  )
}

const styles = stylex.create({
  my: {
    width: '90%',
    marginInline: 'auto',
    paddingBottom: space.x6,
  },
  iconButton: {
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
  beta: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
    margin: 0,
    marginTop: space.x3,
    color: colors.brandStrong,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.black,
  },
})
