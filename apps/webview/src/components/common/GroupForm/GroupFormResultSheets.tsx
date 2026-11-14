import * as stylex from '@stylexjs/stylex'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { colors } from '@src/styles/tokens.stylex'

type Props = {
  done: { open: boolean; title: string; message: string; onConfirm: () => void }
  failure: { open: boolean; message: string; onClose: () => void }
}

export function GroupFormResultSheets({ done, failure }: Props) {
  return (
    <>
      <BottomSheet
        open={done.open}
        onClose={done.onConfirm}
        title={done.title}
        actions={
          <Button variant="floating" onClick={done.onConfirm}>
            확인
          </Button>
        }
      >
        <p {...stylex.props(styles.text)}>{done.message}</p>
      </BottomSheet>
      <BottomSheet
        open={failure.open}
        onClose={failure.onClose}
        title="요청에 실패했어요"
        actions={
          <Button variant="floating" onClick={failure.onClose}>
            확인
          </Button>
        }
      >
        <p {...stylex.props(styles.text)}>{failure.message}</p>
      </BottomSheet>
    </>
  )
}

const styles = stylex.create({
  text: {
    margin: 0,
    color: colors.textTertiary,
  },
})
