export const NETWORK_ERROR_MESSAGE = '잠시 후 다시 시도해주세요'

export function toMutationErrorMessage(error: { readonly __typename: string; readonly message?: string }) {
  return error.message ?? NETWORK_ERROR_MESSAGE
}
