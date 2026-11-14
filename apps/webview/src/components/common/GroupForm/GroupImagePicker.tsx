import type { RegisteredActivityName } from '@stackflow/config'
import * as stylex from '@stylexjs/stylex'
import { useRef, useState, type ChangeEvent } from 'react'

import deleteIcon from '@src/assets/group/delete.svg'
import inputImage from '@src/assets/group/input-img.svg'
import type { GroupFormImage } from '@src/components/common/GroupForm/groupFormValues'
import { ImageUploadFailureSheet } from '@src/components/common/Image/ImageUploadFailureSheet'
import { IMAGE_ACCEPT, useUploadImage } from '@src/components/common/Image/useUploadImage'
import { Spinner } from '@src/components/shared/Spinner'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, fontSize, radius } from '@src/styles/tokens.stylex'

type Props = {
  activityName: RegisteredActivityName
  images: GroupFormImage[]
  onUploadingChange: (uploading: boolean) => void
  onAdd: (image: GroupFormImage) => void
  onRemove: (image: GroupFormImage) => void
}

export function GroupImageAddButton({
  activityName,
  onUploadingChange,
  onAdd,
}: Pick<Props, 'activityName' | 'onUploadingChange' | 'onAdd'>) {
  const upload = useUploadImage('GROUP')
  const pendingCount = useRef(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(activityName, 'image-failure')

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) {
      return
    }
    pendingCount.current += 1
    setIsUploading(true)
    onUploadingChange(true)
    try {
      const image = await upload(file)
      if (image === null) {
        openFailure()
        return
      }
      onAdd(image)
    } catch {
      openFailure()
    } finally {
      pendingCount.current -= 1
      setIsUploading(pendingCount.current > 0)
      onUploadingChange(pendingCount.current > 0)
    }
  }

  return (
    <>
      <label {...stylex.props(styles.addButton)}>
        {isUploading ? <Spinner /> : <span {...stylex.props(styles.addText)}>사진 추가하기</span>}
        <img src={inputImage} alt="" width={24} height={24} />
        <input type="file" accept={IMAGE_ACCEPT} onChange={handleFileChange} {...stylex.props(styles.hidden)} />
      </label>
      <ImageUploadFailureSheet open={isFailureOpen} onClose={closeFailure} />
    </>
  )
}

export function GroupImageList({ images, onRemove }: Pick<Props, 'images' | 'onRemove'>) {
  if (images.length === 0) {
    return null
  }
  return (
    <div {...stylex.props(styles.list)}>
      {images.map((image, index) => (
        <div key={image.id} {...stylex.props(styles.item)}>
          <button
            type="button"
            aria-label="이미지 삭제"
            onClick={() => onRemove(image)}
            {...stylex.props(styles.remove)}
          >
            <img src={deleteIcon} alt="" width={24} height={24} />
          </button>
          <img src={image.url} alt={`이미지${index + 1}`} {...stylex.props(styles.image)} />
        </div>
      ))}
    </div>
  )
}

const styles = stylex.create({
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    width: 'fit-content',
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  addText: {
    color: colors.brand,
    fontSize: fontSize.sm,
  },
  hidden: {
    display: 'none',
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '210px',
    overflowX: 'auto',
  },
  item: {
    position: 'relative',
    flexShrink: 0,
  },
  remove: {
    position: 'absolute',
    top: '-8px',
    right: '-5px',
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
  image: {
    width: '160px',
    height: '188px',
    objectFit: 'cover',
    borderRadius: radius.chip,
  },
})
