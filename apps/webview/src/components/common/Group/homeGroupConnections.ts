import { ConnectionHandler, ROOT_ID } from 'relay-runtime'

export function homeGroupConnectionIds(category: string) {
  return [null, category].map((value) =>
    ConnectionHandler.getConnectionID(ROOT_ID, 'HomeGroupList_query_groups', { category: value }),
  )
}
