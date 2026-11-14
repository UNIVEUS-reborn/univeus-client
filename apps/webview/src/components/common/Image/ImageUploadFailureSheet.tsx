import * as stylex from '@stylexjs/stylex'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { colors, fontSize, space } from '@src/styles/tokens.stylex'

type Props = {
  open: boolean
  onClose: () => void
}

export function ImageUploadFailureSheet({ open, onClose }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="이미지 업로드 실패!"
      actions={
        <Button variant="floating" onClick={onClose}>
          확인
        </Button>
      }
    >
      <p {...stylex.props(styles.text)}>{'업로드가 불가능한 이미지입니다.\n다른 이미지를 선택해주세요!'}</p>
      <p {...stylex.props(styles.reason)}>업로드 불가 사유: 업로드 불가 확장자 혹은 용량</p>
    </BottomSheet>
  )
}

const styles = stylex.create({
  text: {
    margin: 0,
    color: colors.textTertiary,
  },
  reason: {
    marginTop: space.x2,
    marginBottom: 0,
    color: colors.danger,
    fontSize: fontSize.sm,
  },
})
