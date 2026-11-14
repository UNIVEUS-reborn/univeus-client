import { graphql, useMutation } from 'react-relay'

import type { useSaveIntroductionMutation } from '@src/__generated__/useSaveIntroductionMutation.graphql'
import type { IntroductionField } from '@src/pages/pageIntroductionEdit/domain/introduction'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onFailure: (message: string) => void
}

export function useSaveIntroduction() {
  const [commit, isInFlight] = useMutation<useSaveIntroductionMutation>(graphql`
    mutation useSaveIntroductionMutation($input: SaveIntroductionInput!) {
      saveIntroduction(input: $input) {
        user {
          id
          introduction {
            mbti
            favoriteFood
            recentSong
            interest
            matchingPerson
            collegeGoal
            ...IntroductionAnswers_userIntroduction
          }
        }
        error {
          __typename
          ... on InvalidIntroductionInputError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const saveIntroduction = (answers: Record<IntroductionField, string | null>, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: answers },
      onCompleted: ({ saveIntroduction: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        if (result.user === null || result.user === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess()
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { saveIntroduction, isInFlight }
}
