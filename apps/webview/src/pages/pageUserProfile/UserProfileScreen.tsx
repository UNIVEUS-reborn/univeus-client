import { useActivityParams } from '@stackflow/react'
import * as stylex from '@stylexjs/stylex'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { UserProfileScreenQuery } from '@src/__generated__/UserProfileScreenQuery.graphql'
import declaration from '@src/assets/profile/declaration.svg'
import { ReportSheet } from '@src/components/common/Report/ReportSheet'
import { IntroductionAnswers } from '@src/components/common/User/IntroductionAnswers'
import { UserProfileCard } from '@src/components/common/User/UserProfileCard'
import { CenterMessage } from '@src/components/shared/CenterMessage'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { Activity } from '@src/routes/activityNames'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

export function UserProfileScreen() {
  const { userId } = useActivityParams<typeof Activity.USER_PROFILE>()
  const [isReportOpen, openReport, closeReport] = useStepFlowModalState(Activity.USER_PROFILE, 'report')
  const { user } = useLazyLoadQuery<UserProfileScreenQuery>(
    graphql`
      query UserProfileScreenQuery($userId: ID!) {
        user(userId: $userId) {
          id
          createdGroupCount
          joinedGroupCount
          ...UserProfileCard_user
          introduction {
            ...IntroductionAnswers_userIntroduction
          }
        }
      }
    `,
    { userId },
    { fetchPolicy: 'store-and-network' },
  )

  return (
    <ScreenLayout
      title="유저 프로필"
      renderRight={() => (
        <button type="button" aria-label="유저 신고" onClick={openReport} {...stylex.props(styles.icon)}>
          <img src={declaration} alt="" width={22} height={21} />
        </button>
      )}
    >
      {user === null || user === undefined ? (
        <CenterMessage>존재하지 않는 유저입니다.</CenterMessage>
      ) : (
        <div {...stylex.props(styles.body)}>
          <UserProfileCard
            userRef={user}
            right={
              <div {...stylex.props(styles.counts)}>
                <Count label="생성" value={user.createdGroupCount} />
                <Count label="참여" value={user.joinedGroupCount} />
              </div>
            }
          />
          {user.introduction === null || user.introduction === undefined ? (
            <p {...stylex.props(styles.empty)}>작성한 내용이 없어요!</p>
          ) : (
            <div {...stylex.props(styles.introduction)}>
              <IntroductionAnswers introductionRef={user.introduction} />
            </div>
          )}
        </div>
      )}
      <ReportSheet open={isReportOpen} title="이 유저를 신고하시겠어요?" onClose={closeReport} />
    </ScreenLayout>
  )
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div {...stylex.props(styles.count)}>
      <span {...stylex.props(styles.countLabel)}>{label}</span>
      <span {...stylex.props(styles.countValue)}>{value}회</span>
    </div>
  )
}

const styles = stylex.create({
  icon: {
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
  body: {
    width: '90%',
    marginInline: 'auto',
  },
  counts: {
    display: 'flex',
    gap: '29px',
  },
  count: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space.x1,
  },
  countLabel: {
    color: colors.brandMuted,
    fontSize: fontSize.xs,
  },
  countValue: {
    color: colors.brandStrong,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  introduction: {
    marginTop: '35px',
  },
  empty: {
    marginTop: '30vh',
    color: colors.textTertiary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
})
