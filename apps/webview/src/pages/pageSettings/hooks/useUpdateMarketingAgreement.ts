import { graphql, useMutation } from 'react-relay'

import type { useUpdateMarketingAgreementMutation } from '@src/__generated__/useUpdateMarketingAgreementMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

export function useUpdateMarketingAgreement() {
  const [commit] = useMutation<useUpdateMarketingAgreementMutation>(graphql`
    mutation useUpdateMarketingAgreementMutation($input: UpdateMarketingAgreementInput!) {
      updateMarketingAgreement(input: $input) {
        viewer {
          id
          marketingAgreed
        }
        error {
          __typename
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  return (viewerId: string, agreed: boolean, onFailure: (message: string) => void) =>
    commit({
      variables: { input: { agreed } },
      optimisticResponse: {
        updateMarketingAgreement: { viewer: { id: viewerId, marketingAgreed: agreed }, error: null },
      },
      onCompleted: ({ updateMarketingAgreement: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
        }
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })
}
