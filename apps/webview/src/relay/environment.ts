import { Environment, Network, RecordSource, Store, type FetchFunction } from 'relay-runtime'

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const response = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: request.text, variables }),
  })
  return response.json()
}

export const environment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
})
