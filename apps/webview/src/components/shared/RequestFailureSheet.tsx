import * as stylex from '@stylexjs/stylex'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { colors } from '@src/styles/tokens.stylex'

type Props = {
  open: boolean
  message: string
  onClose: () => void
}

export function RequestFailureSheet({ open, message, onClose }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="요청에 실패했어요"
      actions={
        <Button variant="floating" onClick={onClose}>
          확인
        </Button>
      }
    >
      <p {...stylex.props(styles.text)}>{message}</p>
    </BottomSheet>
  )
}

const styles = stylex.create({
  text: {
    margin: 0,
    color: colors.textTertiary,
  },
})
