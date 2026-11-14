import { useActivityParams } from '@stackflow/react'
import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { IntroductionEditScreenQuery } from '@src/__generated__/IntroductionEditScreenQuery.graphql'
import { IntroductionQuestion } from '@src/components/common/User/IntroductionQuestion'
import { INTRODUCTION_QUESTIONS } from '@src/components/common/User/introductionQuestions'
import { IntroductionTitle } from '@src/components/common/User/IntroductionTitle'
import { HeaderTextButton } from '@src/components/shared/HeaderTextButton'
import { RequestFailureSheet } from '@src/components/shared/RequestFailureSheet'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import {
  INTRODUCTION_ANSWER_MAX_LENGTH,
  validateIntroduction,
  type IntroductionInput,
} from '@src/pages/pageIntroductionEdit/domain/introduction'
import { useSaveIntroduction } from '@src/pages/pageIntroductionEdit/hooks/useSaveIntroduction'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, fontSize } from '@src/styles/tokens.stylex'

export function IntroductionEditScreen() {
  const { from } = useActivityParams<typeof Activity.INTRODUCTION_EDIT>()
  const { pop, replace } = useFlow()
  const { viewer } = useLazyLoadQuery<IntroductionEditScreenQuery>(
    graphql`
      query IntroductionEditScreenQuery {
        viewer {
          user {
            id
            introduction {
              mbti
              favoriteFood
              recentSong
              interest
              matchingPerson
              collegeGoal
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' },
  )
  const saved = viewer.user.introduction
  const [answers, setAnswers] = useState<IntroductionInput>(() => ({
    mbti: saved?.mbti ?? '',
    favoriteFood: saved?.favoriteFood ?? '',
    recentSong: saved?.recentSong ?? '',
    interest: saved?.interest ?? '',
    matchingPerson: saved?.matchingPerson ?? '',
    collegeGoal: saved?.collegeGoal ?? '',
  }))
  const [failureMessage, setFailureMessage] = useState('')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.INTRODUCTION_EDIT, 'failure')
  const { saveIntroduction, isInFlight } = useSaveIntroduction()
  const result = validateIntroduction(answers)

  const handleSubmit = () => {
    if (result.type === 'INVALID') {
      return
    }
    saveIntroduction(result.value, {
      onSuccess: () => (from === 'my' ? replace(Activity.INTRODUCTION, {}) : pop()),
      onFailure: (message) => {
        setFailureMessage(message)
        openFailure()
      },
    })
  }

  return (
    <ScreenLayout
      title="나의 자기소개 작성"
      renderRight={() => (
        <HeaderTextButton disabled={result.type === 'INVALID' || isInFlight} onClick={handleSubmit}>
          완료
        </HeaderTextButton>
      )}
    >
      <div {...stylex.props(styles.body)}>
        <IntroductionTitle />
        {INTRODUCTION_QUESTIONS.map(({ field, question }) => (
          <label key={field} {...stylex.props(styles.item)}>
            <IntroductionQuestion question={question} />
            <input
              type="text"
              placeholder="답변을 입력해주세요."
              maxLength={INTRODUCTION_ANSWER_MAX_LENGTH}
              value={answers[field]}
              onChange={(event) => setAnswers((prev) => ({ ...prev, [field]: event.target.value }))}
              {...stylex.props(styles.input)}
            />
          </label>
        ))}
      </div>
      <RequestFailureSheet open={isFailureOpen} message={failureMessage} onClose={closeFailure} />
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    width: '90%',
    marginInline: 'auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '14px',
    paddingLeft: '10px',
  },
  input: {
    width: '90%',
    paddingLeft: '19px',
    paddingBottom: '10px',
    borderStyle: 'none',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textDisabled,
    outline: 'none',
    color: colors.brand,
    fontFamily: 'inherit',
    fontSize: fontSize.lg,
    '::placeholder': {
      color: colors.placeholder,
    },
  },
})
