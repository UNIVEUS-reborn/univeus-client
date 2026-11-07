import type { IMocks } from '@graphql-tools/mock'

export const mocks: IMocks = {
  DateTime: () => new Date().toISOString(),
}
