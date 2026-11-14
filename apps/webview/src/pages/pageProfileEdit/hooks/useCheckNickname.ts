import { fetchQuery, graphql, useRelayEnvironment } from 'react-relay'

import type { NicknameAvailability, useCheckNicknameQuery } from '@src/__generated__/useCheckNicknameQuery.graphql'

export function useCheckNickname() {
  const environment = useRelayEnvironment()

  return async (nickname: string): Promise<NicknameAvailability> => {
    const data = await fetchQuery<useCheckNicknameQuery>(
      environment,
      graphql`
        query useCheckNicknameQuery($nickname: String!) {
          nicknameAvailability(nickname: $nickname)
        }
      `,
      { nickname },
      { fetchPolicy: 'network-only' },
    ).toPromise()
    if (data === undefined) {
      throw new Error('닉네임 확인 응답이 없어요')
    }
    return data.nicknameAvailability
  }
}
