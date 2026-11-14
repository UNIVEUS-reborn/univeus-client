import type { RegisteredActivityName } from '@stackflow/config'
import * as stylex from '@stylexjs/stylex'
import { useLayoutEffect, useRef } from 'react'

import { GROUP_CONTENT_MAX_LENGTH, GROUP_TITLE_MAX_LENGTH } from '@src/components/common/GroupForm/domain/groupForm'
import { GroupFormStepHeader } from '@src/components/common/GroupForm/GroupFormStepHeader'
import type { GroupFormImage, GroupFormValues } from '@src/components/common/GroupForm/groupFormValues'
import { GroupImageAddButton, GroupImageList } from '@src/components/common/GroupForm/GroupImagePicker'
import { colors, fontSize, fontWeight, space } from '@src/styles/tokens.stylex'

type Props = {
  activityName: RegisteredActivityName
  values: GroupFormValues
  onChange: (values: Partial<GroupFormValues>) => void
  onUploadingChange: (uploading: boolean) => void
}

const CONTENT_PLACEHOLDER = `어떤 모임을 진행할 예정인가요? 간단하게 작성해 보아요 :)

EX)
- 모임 주제 (바른 프로젝트 팀원을 구합니다.)
- 원하는 분위기나, 성격
- 원하는 과, 단과대
- 자신의 경험 사항(프로젝트, 공모전, 대외활동 등)
- 모임의 목표`

export function ContentStep({ activityName, values, onChange, onUploadingChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (textarea !== null) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [values.content])

  const handleAdd = (image: GroupFormImage) => onChange({ images: [...values.images, image] })
  const handleRemove = (image: GroupFormImage) => {
    if (image.isLocal) {
      URL.revokeObjectURL(image.url)
    }
    onChange({ images: values.images.filter(({ id }) => id !== image.id) })
  }

  return (
    <div {...stylex.props(styles.step)}>
      <GroupFormStepHeader progress={90} label="마지막이에요!" />
      <label {...stylex.props(styles.titleGroup)}>
        <span {...stylex.props(styles.fieldTitle)}>제목</span>
        <input
          type="text"
          maxLength={GROUP_TITLE_MAX_LENGTH}
          placeholder="센스있는 제목으로 이목을 끌어보아요 :)"
          value={values.title}
          onChange={(event) => onChange({ title: event.target.value })}
          {...stylex.props(styles.titleInput)}
        />
      </label>
      <GroupImageAddButton activityName={activityName} onUploadingChange={onUploadingChange} onAdd={handleAdd} />
      <label {...stylex.props(styles.contentGroup)}>
        <span {...stylex.props(styles.contentTitle)}>내용</span>
        <textarea
          ref={textareaRef}
          rows={9}
          maxLength={GROUP_CONTENT_MAX_LENGTH}
          placeholder={CONTENT_PLACEHOLDER}
          value={values.content}
          onChange={(event) => onChange({ content: event.target.value })}
          {...stylex.props(styles.textarea)}
        />
      </label>
      <GroupImageList images={values.images} onRemove={handleRemove} />
    </div>
  )
}

const styles = stylex.create({
  step: {
    width: '90%',
    marginInline: 'auto',
    paddingTop: space.x2,
    paddingBottom: space.x6,
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9px',
    marginTop: space.x8,
    marginBottom: space.x5,
  },
  fieldTitle: {
    fontWeight: fontWeight.bold,
  },
  titleInput: {
    paddingTop: '5px',
    paddingBottom: '10px',
    paddingLeft: '3px',
    borderStyle: 'none',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textDisabled,
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: fontSize.md,
    '::placeholder': {
      color: colors.placeholder,
    },
  },
  contentGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '17px',
  },
  contentTitle: {
    marginBottom: space.x6,
    fontWeight: fontWeight.bold,
  },
  textarea: {
    width: '100%',
    padding: 0,
    borderStyle: 'none',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    fontFamily: 'inherit',
    fontSize: fontSize.md,
    '::placeholder': {
      color: colors.placeholder,
    },
  },
})
