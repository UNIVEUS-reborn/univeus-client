import { graphql, useMutation } from 'react-relay'

import type { useAgreeToTermsMutation } from '@src/__generated__/useAgreeToTermsMutation.graphql'
import type { TermsInput } from '@src/pages/pageSignup/domain/terms'
import { handleSignupResult, type SignupCallbacks } from '@src/pages/pageSignup/hooks/signupMutationResult'
import { NETWORK_ERROR_MESSAGE } from '@src/relay/mutationError'

export function useAgreeToTerms() {
  const [commit, isInFlight] = useMutation<useAgreeToTermsMutation>(graphql`
    mutation useAgreeToTermsMutation($input: AgreeToTermsInput!) {
      agreeToTerms(input: $input) {
        authState {
          id
          ...authDestination_authState
        }
        error {
          __typename
          ... on RequiredTermsNotAgreedError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const agreeToTerms = (input: TermsInput, callbacks: SignupCallbacks) =>
    commit({
      variables: { input },
      onCompleted: ({ agreeToTerms: result }) => handleSignupResult(result, callbacks),
      onError: () => callbacks.onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { agreeToTerms, isInFlight }
}
