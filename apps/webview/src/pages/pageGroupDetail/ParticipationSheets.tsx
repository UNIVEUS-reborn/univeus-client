import * as stylex from '@stylexjs/stylex'

import { BottomSheet } from '@src/components/shared/BottomSheet'
import { Button } from '@src/components/shared/Button'
import type { ParticipationSheetsState } from '@src/pages/pageGroupDetail/hooks/useParticipationSheets'
import { colors } from '@src/styles/tokens.stylex'

type Props = {
  sheets: ParticipationSheetsState
}

export function ParticipationSheets({ sheets }: Props) {
  const { joinDoneSheet, joinPendingSheet, cancelSheet, cancelDoneSheet, approveDoneSheet } = sheets

  return (
    <>
      <BottomSheet
        open={joinDoneSheet.isOpen}
        onClose={joinDoneSheet.close}
        title="유니버스 참여완료!"
        actions={
          <>
            <Button variant="secondary" onClick={joinDoneSheet.close}>
              나중에 할래요
            </Button>
            <Button variant="primary" onClick={joinDoneSheet.close}>
              채팅방 입장
            </Button>
          </>
        }
      >
        <Text>{'유니버스에 참여가 완료되었어요.\n채팅방에 입장하여 인사로 시작해 볼까요?'}</Text>
      </BottomSheet>
      <BottomSheet
        open={joinPendingSheet.isOpen}
        onClose={joinPendingSheet.close}
        title="유니버스 참여대기 완료!"
        actions={
          <Button variant="floating" onClick={joinPendingSheet.close}>
            확인
          </Button>
        }
      >
        <Text>{'해당 유니버스는 방장의 승인이 필요해요 :)\n승인 시 알림을 보내드릴게요.'}</Text>
      </BottomSheet>
      <BottomSheet
        open={cancelSheet.isOpen}
        onClose={cancelSheet.close}
        title="참여를 취소하시겠어요?"
        actions={
          <>
            <Button variant="secondary" onClick={cancelSheet.close}>
              참여유지
            </Button>
            <Button variant="primary" disabled={sheets.isCanceling} onClick={sheets.handleCancelConfirm}>
              참여 취소
            </Button>
          </>
        }
      >
        <Text>{'취소 즉시 채팅방에서 퇴장되며\n잦은 취소는 패널티가 부여 될 수 있습니다.'}</Text>
      </BottomSheet>
      <BottomSheet
        open={cancelDoneSheet.isOpen}
        onClose={cancelDoneSheet.close}
        title="참여 취소가 완료되었습니다."
        actions={
          <Button variant="floating" onClick={cancelDoneSheet.close}>
            확인
          </Button>
        }
      >
        <Text>{'다른 유니버스를 찾아보거나\n내가 하고 싶은 유니버스를 생성해도 좋아요'}</Text>
      </BottomSheet>
      <BottomSheet
        open={approveDoneSheet.isOpen}
        onClose={approveDoneSheet.close}
        title="참여자 승인완료!"
        actions={
          <Button variant="floating" onClick={approveDoneSheet.close}>
            확인
          </Button>
        }
      >
        <Text>{'해당 친구의 유니버스 참여가 승인되었어요.\n친구들과 즐거운 모임이 되길 바랄게요!'}</Text>
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
