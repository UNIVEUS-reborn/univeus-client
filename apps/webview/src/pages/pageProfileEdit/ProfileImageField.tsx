import * as stylex from '@stylexjs/stylex'
import { useState, type ChangeEvent } from 'react'

import deleteIcon from '@src/assets/group/delete.svg'
import personFill from '@src/assets/group/person_fill.svg'
import pencil from '@src/assets/profile/write.svg'
import { ImageUploadFailureSheet } from '@src/components/common/Image/ImageUploadFailureSheet'
import { IMAGE_ACCEPT, useUploadImage, type UploadedImage } from '@src/components/common/Image/useUploadImage'
import { Spinner } from '@src/components/shared/Spinner'
import { Activity } from '@src/routes/activityNames'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'
import { colors, radius } from '@src/styles/tokens.stylex'

export type ProfileImage = UploadedImage

type Props = {
  image: ProfileImage | null
  onChange: (image: ProfileImage | null) => void
  onUploadingChange: (uploading: boolean) => void
}

export function ProfileImageField({ image, onChange, onUploadingChange }: Props) {
  const upload = useUploadImage('PROFILE')
  const [isUploading, setIsUploading] = useState(false)
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.PROFILE_EDIT, 'image-failure')

  const replaceImage = (next: ProfileImage | null) => {
    if (image?.isLocal === true) {
      URL.revokeObjectURL(image.url)
    }
    onChange(next)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) {
      return
    }
    setIsUploading(true)
    onUploadingChange(true)
    try {
      const uploaded = await upload(file)
      if (uploaded === null) {
        openFailure()
        return
      }
      replaceImage(uploaded)
    } catch {
      openFailure()
    } finally {
      setIsUploading(false)
      onUploadingChange(false)
    }
  }

  return (
    <div {...stylex.props(styles.frame)}>
      <label aria-label="프로필 사진 선택" {...stylex.props(styles.picker)}>
        {isUploading ? (
          <Spinner />
        ) : image === null ? (
          <>
            <img src={personFill} alt="" width={47} height={47} />
            <img src={pencil} alt="" width={36} height={36} {...stylex.props(styles.pencil)} />
          </>
        ) : (
          <img src={image.url} alt="프로필 이미지" {...stylex.props(styles.image)} />
        )}
        <input type="file" accept={IMAGE_ACCEPT} onChange={handleFileChange} {...stylex.props(styles.hidden)} />
      </label>
      {image !== null && (
        <button
          type="button"
          aria-label="프로필 사진 삭제"
          onClick={() => replaceImage(null)}
          {...stylex.props(styles.remove)}
        >
          <img src={deleteIcon} alt="" width={25} height={25} />
        </button>
      )}
      <ImageUploadFailureSheet open={isFailureOpen} onClose={closeFailure} />
    </div>
  )
}

const styles = stylex.create({
  frame: {
    position: 'relative',
    width: '100px',
    height: '100px',
    marginInline: 'auto',
  },
  picker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: radius.full,
    backgroundColor: colors.brandWeak,
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  pencil: {
    position: 'absolute',
    bottom: '-6px',
  },
  hidden: {
    display: 'none',
  },
  remove: {
    position: 'absolute',
    top: 0,
    right: '2px',
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
})
