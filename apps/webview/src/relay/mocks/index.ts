import type { IMocks, IMockStore } from '@graphql-tools/mock'

import { groupMocks, groupResolvers } from '@src/relay/mocks/group'
import { profileMocks, profileResolvers } from '@src/relay/mocks/profile'

export const mocks: IMocks = {
  DateTime: () => new Date().toISOString(),
  ...groupMocks,
  ...profileMocks,
}

export const resolvers = (store: IMockStore) => {
  const group = groupResolvers(store)
  const profile = profileResolvers(store)
  return {
    ...group,
    ...profile,
    Query: { ...group.Query, ...profile.Query },
    Mutation: { ...group.Mutation, ...profile.Mutation },
  }
}
