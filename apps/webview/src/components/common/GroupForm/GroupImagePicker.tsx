import type { RegisteredActivityName } from '@stackflow/config'
import * as stylex from '@stylexjs/stylex'
import { useRef, useState, type ChangeEvent } from 'react'

import deleteIcon from '@src/assets/group/delete.svg'
import inputImage from '@src/assets/group/input-img.svg'
import type { GroupFormImage } from '@src/components/common/GroupForm/groupFormValues'
import { useUploadGroupImage } from '@src/components/common/GroupForm/useUploadGroupImage'
import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import { Spinner } from '@src/components/shared/Spinner'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, fontSize, radius, space } from '@src/styles/tokens.stylex'

type Props = {
  activityName: RegisteredActivityName
  images: GroupFormImage[]
  onUploadingChange: (uploading: boolean) => void
  onAdd: (image: GroupFormImage) => void
  onRemove: (image: GroupFormImage) => void
}

const ACCEPT = 'image/jpeg,image/png,image/webp,image/heic'

export function GroupImageAddButton({
  activityName,
  onUploadingChange,
  onAdd,
}: Pick<Props, 'activityName' | 'onUploadingChange' | 'onAdd'>) {
  const upload = useUploadGroupImage()
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
        <input type="file" accept={ACCEPT} onChange={handleFileChange} {...stylex.props(styles.hidden)} />
      </label>
      <BottomSheet
        open={isFailureOpen}
        onClose={closeFailure}
        title="이미지 업로드 실패!"
        actions={
          <Button variant="floating" onClick={closeFailure}>
            확인
          </Button>
        }
      >
        <p {...stylex.props(styles.failureText)}>{'업로드가 불가능한 이미지입니다.\n다른 이미지를 선택해주세요!'}</p>
        <p {...stylex.props(styles.failureReason)}>업로드 불가 사유: 업로드 불가 확장자 혹은 용량</p>
      </BottomSheet>
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
  failureText: {
    margin: 0,
    color: colors.textTertiary,
  },
  failureReason: {
    marginTop: space.x2,
    marginBottom: 0,
    color: colors.danger,
    fontSize: fontSize.sm,
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
