import * as stylex from '@stylexjs/stylex'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { IntroductionScreenQuery } from '@src/__generated__/IntroductionScreenQuery.graphql'
import { IntroductionAnswers } from '@src/components/common/User/IntroductionAnswers'
import { IntroductionTitle } from '@src/components/common/User/IntroductionTitle'
import { HeaderTextButton } from '@src/components/shared/HeaderTextButton'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'

export function IntroductionScreen() {
  const { push } = useFlow()
  const { viewer } = useLazyLoadQuery<IntroductionScreenQuery>(
    graphql`
      query IntroductionScreenQuery {
        viewer {
          user {
            introduction {
              ...IntroductionAnswers_userIntroduction
            }
          }
        }
      }
    `,
    {},
  )

  return (
    <ScreenLayout
      title="나의 자기소개"
      renderRight={() => (
        <HeaderTextButton disabled={false} onClick={() => push(Activity.INTRODUCTION_EDIT, {})}>
          편집
        </HeaderTextButton>
      )}
    >
      <div {...stylex.props(styles.body)}>
        <IntroductionTitle />
        <IntroductionAnswers introductionRef={viewer.user.introduction ?? null} />
      </div>
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    width: '90%',
    marginInline: 'auto',
  },
})
