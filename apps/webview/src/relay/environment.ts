import { Environment, Network, RecordSource, Store, type FetchFunction } from 'relay-runtime'

const fetchGraphQL: FetchFunction = async (request, variables) => {
  if (request.text === null) {
    throw new Error(`${request.name}: query text가 없어요`)
  }

  if (import.meta.env.DEV && !import.meta.env.VITE_GRAPHQL_URL) {
    const { executeMock } = await import('@src/relay/mockNetwork')
    return executeMock(request.text, variables)
  }

  const response = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ query: request.text, variables }),
  })
  return response.json()
}

export const environment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
})
