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

  it('목록 카드와 상세가 같은 모임을 돌려줘요', async () => {
    const list = await executeMock('{ groups(first: 1) { edges { node { id _id title participantCount } } } }', {})
    const card = list.data.groups.edges[0].node
    const detail = await executeMock('query ($id: ID!) { group(groupId: $id) { id title participantCount } }', {
      id: card._id,
    })
    expect(detail.data.group).toEqual({ id: card.id, title: card.title, participantCount: card.participantCount })
  })

  it('참여 결과는 모임 ID로 정해져요', async () => {
    const join = (groupId: string) =>
      executeMock(
        'mutation ($input: JoinGroupInput!) { joinGroup(input: $input) { group { viewerRole participationMethod } } }',
        { input: { groupId } },
      )
    expect((await join('aa1')).data.joinGroup.group).toEqual({
      viewerRole: 'PENDING',
      participationMethod: 'MANUAL_APPROVAL',
    })
    expect((await join('ab1')).data.joinGroup.group).toEqual({
      viewerRole: 'PARTICIPANT',
      participationMethod: 'AUTO_APPROVAL',
    })
  })
})
