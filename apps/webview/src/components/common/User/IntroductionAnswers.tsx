import * as stylex from '@stylexjs/stylex'
import { graphql, useFragment } from 'react-relay'

import type { IntroductionAnswers_userIntroduction$key } from '@src/__generated__/IntroductionAnswers_userIntroduction.graphql'
import { IntroductionQuestion } from '@src/components/common/User/IntroductionQuestion'
import { INTRODUCTION_QUESTIONS } from '@src/components/common/User/introductionQuestions'
import { colors, fontWeight, space } from '@src/styles/tokens.stylex'

type Props = {
  introductionRef: IntroductionAnswers_userIntroduction$key | null
}

export function IntroductionAnswers({ introductionRef }: Props) {
  const introduction = useFragment(
    graphql`
      fragment IntroductionAnswers_userIntroduction on UserIntroduction {
        mbti
        favoriteFood
        recentSong
        interest
        matchingPerson
        collegeGoal
      }
    `,
    introductionRef,
  )

  return (
    <div {...stylex.props(styles.list)}>
      {INTRODUCTION_QUESTIONS.map(({ field, question }) => (
        <div key={field} {...stylex.props(styles.item)}>
          <IntroductionQuestion question={question} />
          <p {...stylex.props(styles.answer)}>{introduction?.[field] ?? '입력하지 않은 답변입니다.'}</p>
        </div>
      ))}
    </div>
  )
}

const styles = stylex.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x6,
  },
  item: {
    marginLeft: '10px',
  },
  answer: {
    width: '85%',
    margin: 0,
    marginLeft: '19px',
    color: colors.brand,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.4,
  },
})
