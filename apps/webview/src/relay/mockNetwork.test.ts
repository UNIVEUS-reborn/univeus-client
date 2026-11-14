import { describe, expect, it } from 'vitest'

import { executeMock } from '@src/relay/mockNetwork'

describe('executeMock', () => {
  it('schema.graphql 기준으로 가짜 응답을 만들어요', async () => {
    const result = await executeMock('query ($id: ID!) { node(id: $id) { id } }', { id: '1' })
    expect(result.errors).toBeUndefined()
    expect(typeof result.data.node.id).toBe('string')
  })

  it('DateTime은 ISO 문자열이에요', async () => {
    const result = await executeMock('{ group(groupId: "1") { meetingAt } }', {})
    expect(new Date(result.data.group.meetingAt).toISOString()).toBe(result.data.group.meetingAt)
  })

  it('schema에 없는 필드를 요청하면 에러를 돌려줘요', async () => {
    const result = await executeMock('{ unknownField }', {})
    expect(result.errors).toHaveLength(1)
  })

  it('모임을 삭제하면 요청한 ID를 deletedId로 돌려줘요', async () => {
    const result = await executeMock(
      'mutation ($input: DeleteGroupInput!) { deleteGroup(input: $input) { deletedId error { __typename } } }',
      { input: { groupId: 'group-1' } },
    )
    expect(result.data.deleteGroup).toEqual({ deletedId: 'group-1', error: null })
  })
})
