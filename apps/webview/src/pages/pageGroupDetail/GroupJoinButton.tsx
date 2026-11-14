import { Button } from '@src/components/shared/Button'
import type { GroupJoinAction } from '@src/pages/pageGroupDetail/domain/groupJoinAction'
import { GroupDetailBottom } from '@src/pages/pageGroupDetail/GroupDetailBottom'

type Props = {
  joinAction: GroupJoinAction
  joining: boolean
  onJoin: () => void
  onCancel: () => void
}

export function GroupJoinButton({ joinAction, joining, onJoin, onCancel }: Props) {
  switch (joinAction.type) {
    case 'JOIN':
      return (
        <GroupDetailBottom>
          <Button variant="floating" disabled={joining} onClick={onJoin}>
            유니버스 참여하기
          </Button>
        </GroupDetailBottom>
      )
    case 'CANCEL':
      return (
        <GroupDetailBottom>
          <Button variant="floating" onClick={onCancel}>
            참여 취소하기
          </Button>
        </GroupDetailBottom>
      )
    case 'BLOCKED':
      return <BlockedButton reason={joinAction.reason} />
  }
}

function BlockedButton({ reason }: { reason: Extract<GroupJoinAction, { type: 'BLOCKED' }>['reason'] }) {
  switch (reason) {
    case 'CLOSED':
      return (
        <GroupDetailBottom>
          <Button variant="floating" disabled>
            유니버스 모집 종료
          </Button>
        </GroupDetailBottom>
      )
    case 'GENDER':
      return (
        <GroupDetailBottom>
          <Button variant="floating" disabled>
            참여 불가능한 성별입니다
          </Button>
        </GroupDetailBottom>
      )
    case 'HOST':
    case 'UNKNOWN':
      return null
  }
}
