import * as stylex from '@stylexjs/stylex'

import type { GroupHostAction } from '@src/components/common/Group/domain/groupHostAction'
import { Button } from '@src/components/shared/Button'
import { space } from '@src/styles/tokens.stylex'

type Props = {
  hostAction: GroupHostAction
  onManage: () => void
}

export function GroupHostButton({ hostAction, onManage }: Props) {
  switch (hostAction.type) {
    case 'MANAGE':
      return (
        <div {...stylex.props(styles.bottom)}>
          <Button variant="floating" onClick={onManage}>
            유니버스 관리하기
          </Button>
        </div>
      )
    case 'CLOSED':
      return (
        <div {...stylex.props(styles.bottom)}>
          <Button variant="floating" disabled>
            유니버스 모집 종료
          </Button>
        </div>
      )
    case 'NOT_HOST':
      return null
  }
}

const styles = stylex.create({
  bottom: {
    width: '90%',
    marginInline: 'auto',
    paddingBottom: `max(${space.x4}, env(safe-area-inset-bottom))`,
  },
})
