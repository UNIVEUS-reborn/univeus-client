import * as stylex from '@stylexjs/stylex'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { RequestFailureSheet } from '@src/components/shared/RequestFailureSheet'
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
      <RequestFailureSheet open={failure.open} message={failure.message} onClose={failure.onClose} />
    </>
  )
}

const styles = stylex.create({
  text: {
    margin: 0,
    color: colors.textTertiary,
  },
})
