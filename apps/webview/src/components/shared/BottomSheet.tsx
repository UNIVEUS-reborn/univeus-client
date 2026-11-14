import * as stylex from '@stylexjs/stylex'
import { useEffect, useRef, type ReactNode } from 'react'

import { colors, fontSize, fontWeight, radius, shadow, space } from '@src/styles/tokens.stylex'

type Props = {
  open: boolean
  onClose: () => void
  title: ReactNode
  children?: ReactNode
  actions: ReactNode
}

export function BottomSheet({ open, onClose, title, children, actions }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog === null) {
      return
    }
    if (open && !dialog.open) {
      dialog.showModal()
    }
    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      {...stylex.props(styles.dialog)}
    >
      <div {...stylex.props(styles.panel)}>
        <p {...stylex.props(styles.title)}>{title}</p>
        {children !== undefined && <div {...stylex.props(styles.content)}>{children}</div>}
        <div {...stylex.props(styles.actions)}>{actions}</div>
      </div>
    </dialog>
  )
}

const styles = stylex.create({
  dialog: {
    width: '100%',
    maxWidth: '100%',
    marginTop: 'auto',
    marginBottom: 0,
    marginInline: 0,
    padding: 0,
    borderStyle: 'none',
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    backgroundColor: colors.background,
    boxShadow: shadow.sheet,
    '::backdrop': {
      backgroundColor: colors.dim,
    },
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: space.x8,
    paddingInline: space.x5,
    paddingBottom: `max(${space.x6}, env(safe-area-inset-bottom))`,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  title: {
    margin: 0,
    marginBottom: space.x4,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
  },
  content: {
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: space.x4,
    marginTop: space.x7,
  },
})
