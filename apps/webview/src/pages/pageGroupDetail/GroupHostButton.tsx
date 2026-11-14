import type { GroupHostAction } from '@src/components/common/Group/domain/groupHostAction'
import { Button } from '@src/components/shared/Button'
import { GroupDetailBottom } from '@src/pages/pageGroupDetail/GroupDetailBottom'

type Props = {
  hostAction: GroupHostAction
  onManage: () => void
}

export function GroupHostButton({ hostAction, onManage }: Props) {
  switch (hostAction.type) {
    case 'MANAGE':
      return (
        <GroupDetailBottom>
          <Button variant="floating" onClick={onManage}>
            유니버스 관리하기
          </Button>
        </GroupDetailBottom>
      )
    case 'CLOSED':
      return (
        <GroupDetailBottom>
          <Button variant="floating" disabled>
            유니버스 모집 종료
          </Button>
        </GroupDetailBottom>
      )
    case 'NOT_HOST':
      return null
  }
}
