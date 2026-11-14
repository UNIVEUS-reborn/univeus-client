import type { IMocks } from '@graphql-tools/mock'

import { groupMocks, groupResolvers } from '@src/relay/mocks/group'

export const mocks: IMocks = {
  DateTime: () => new Date().toISOString(),
  ...groupMocks,
}

export const resolvers = {
  ...groupResolvers,
}
