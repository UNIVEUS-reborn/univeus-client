import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { colors, fontSize, space } from '@src/styles/tokens.stylex'

const REASONS = [
  '불건전한 언행을 사용해요.',
  '불건전한 프로필을 게시했어요.',
  '광고, 홍보성 게시글을 게시했어요.',
  '부적절한 이미지를 게시했어요.',
  '기타(확인 후 조치를 취해주세요)',
]

type Props = {
  open: boolean
  title: string
  onClose: () => void
}

export function ReportSheet({ open, title, onClose }: Props) {
  const [reason, setReason] = useState<string | null>(null)
  const [wasOpen, setWasOpen] = useState(open)

  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setReason(null)
    }
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            취소하기
          </Button>
          <Button variant="primary" disabled={reason === null} onClick={onClose}>
            신고하기
          </Button>
        </>
      }
    >
      <p {...stylex.props(styles.text)}>신고 사유를 선택해 주시면 확인 후 조치가 취해집니다.</p>
      <fieldset {...stylex.props(styles.reasons)}>
        {REASONS.map((label) => (
          <label key={label} {...stylex.props(styles.reason)}>
            <input
              type="radio"
              name="report-reason"
              checked={reason === label}
              onChange={() => setReason(label)}
              {...stylex.props(styles.radio)}
            />
            {label}
          </label>
        ))}
      </fieldset>
    </BottomSheet>
  )
}

const styles = stylex.create({
  text: {
    margin: 0,
    color: colors.textTertiary,
  },
  reasons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '26px',
    width: '70%',
    marginTop: space.x8,
    marginInline: 'auto',
    padding: 0,
    borderStyle: 'none',
  },
  reason: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: fontSize.lg,
    textAlign: 'left',
  },
  radio: {
    margin: 0,
    accentColor: colors.brandStrong,
  },
})
