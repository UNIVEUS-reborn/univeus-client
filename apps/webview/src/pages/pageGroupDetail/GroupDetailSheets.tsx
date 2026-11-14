import * as stylex from '@stylexjs/stylex'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import type { GroupDetailSheetsState } from '@src/pages/pageGroupDetail/hooks/useGroupDetailSheets'
import { colors } from '@src/styles/tokens.stylex'

type Props = {
  sheets: GroupDetailSheetsState
}

export function GroupDetailSheets({ sheets }: Props) {
  const { closeSheet, closeDoneSheet, manageSheet, deleteSheet, deleteDoneSheet, failureSheet } = sheets

  return (
    <>
      <BottomSheet
        open={closeSheet.isOpen}
        onClose={closeSheet.close}
        title="유니버스 상태 변경"
        actions={
          <>
            <Button variant="secondary" onClick={closeSheet.close}>
              취소하기
            </Button>
            <Button variant="primary" disabled={sheets.isClosing} onClick={sheets.handleCloseConfirm}>
              마감하기
            </Button>
          </>
        }
      >
        <Text>마감일 보다 일찍 유니버스 모집을 종료하고 싶다면 마감하기를 눌러 상태를 변경할 수 있어요</Text>
      </BottomSheet>
      <BottomSheet
        open={closeDoneSheet.isOpen}
        onClose={closeDoneSheet.close}
        title="모집 마감이 완료되었습니다."
        actions={
          <Button variant="floating" onClick={closeDoneSheet.close}>
            확인
          </Button>
        }
      >
        <Text>{'다시 모집하고 싶으시다면\n새로운 게시글을 작성해주세요.'}</Text>
      </BottomSheet>
      <BottomSheet
        open={manageSheet.isOpen}
        onClose={manageSheet.close}
        title="유니버스 관리하기"
        actions={
          <>
            <Button variant="secondary" onClick={sheets.handleEdit}>
              수정하기
            </Button>
            <Button variant="primary" onClick={sheets.handleDeleteRequest}>
              삭제하기
            </Button>
          </>
        }
      >
        <Text>{'내 유니버스를 수정하거나 삭제할 수 있어요.\n모집 상태 변경은 게시글 우상단을 확인해주세요.'}</Text>
      </BottomSheet>
      <BottomSheet
        open={deleteSheet.isOpen}
        onClose={deleteSheet.close}
        title="유니버스 삭제확인"
        actions={
          <>
            <Button variant="secondary" onClick={deleteSheet.close}>
              취소하기
            </Button>
            <Button variant="primary" disabled={sheets.isDeleting} onClick={sheets.handleDeleteConfirm}>
              삭제하기
            </Button>
          </>
        }
      >
        <Text>{'유니버스를 정말 삭제하시겠습니까?\n복원은 불가능합니다.'}</Text>
      </BottomSheet>
      <BottomSheet
        open={deleteDoneSheet.isOpen}
        onClose={sheets.handleDeleteDone}
        title="게시글이 삭제되었습니다."
        actions={
          <Button variant="floating" onClick={sheets.handleDeleteDone}>
            확인
          </Button>
        }
      >
        <Text>{'다시 모집하고 싶으시다면\n새로운 게시글을 작성해주세요.'}</Text>
      </BottomSheet>
      <BottomSheet
        open={failureSheet.isOpen}
        onClose={failureSheet.close}
        title="요청에 실패했어요"
        actions={
          <Button variant="floating" onClick={failureSheet.close}>
            확인
          </Button>
        }
      >
        <Text>{sheets.failureMessage}</Text>
      </BottomSheet>
    </>
  )
}

function Text({ children }: { children: string }) {
  return <p {...stylex.props(styles.text)}>{children}</p>
}

const styles = stylex.create({
  text: {
    margin: 0,
    color: colors.textTertiary,
  },
})
