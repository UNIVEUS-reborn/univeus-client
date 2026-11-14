import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphql } from 'graphql'

import { mocks, resolvers } from '@src/relay/mocks'

import typeDefs from '../../schema.graphql?raw'

const schema = addMocksToSchema({ schema: makeExecutableSchema({ typeDefs }), mocks, resolvers })

export async function executeMock(source: string, variableValues: Record<string, unknown>) {
  const result = await graphql({ schema, source, variableValues })
  return JSON.parse(JSON.stringify(result))
}
