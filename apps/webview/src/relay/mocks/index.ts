import type { IMocks, IMockStore } from '@graphql-tools/mock'

import { groupMocks, groupResolvers } from '@src/relay/mocks/group'

export const mocks: IMocks = {
  DateTime: () => new Date().toISOString(),
  ...groupMocks,
}

export const resolvers = (store: IMockStore) => ({
  ...groupResolvers(store),
})
