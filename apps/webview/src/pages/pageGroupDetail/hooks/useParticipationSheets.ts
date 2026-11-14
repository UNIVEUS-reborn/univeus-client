import { useApproveParticipation } from '@src/pages/pageGroupDetail/hooks/useApproveParticipation'
import { useCancelParticipation } from '@src/pages/pageGroupDetail/hooks/useCancelParticipation'
import { useSheet } from '@src/pages/pageGroupDetail/hooks/useGroupDetailSheets'
import { useJoinGroup } from '@src/pages/pageGroupDetail/hooks/useJoinGroup'

type Params = {
  id: string
  showFailure: (closeCurrent: () => Promise<void>, message: string) => Promise<void>
}

const noSheet = () => Promise.resolve()

export function useParticipationSheets({ id, showFailure }: Params) {
  const joinDoneSheet = useSheet('join-done')
  const joinPendingSheet = useSheet('join-pending')
  const cancelSheet = useSheet('cancel')
  const cancelDoneSheet = useSheet('cancel-done')
  const approveDoneSheet = useSheet('approve-done')
  const { joinGroup, isInFlight: isJoining } = useJoinGroup()
  const { cancelParticipation, isInFlight: isCanceling } = useCancelParticipation()
  const { approveParticipation, isInFlight: isApproving } = useApproveParticipation()

  const handleJoin = () =>
    joinGroup(id, {
      onJoined: joinDoneSheet.open,
      onPending: joinPendingSheet.open,
      onFailure: (message) => showFailure(noSheet, message),
    })

  const handleCancelConfirm = () =>
    cancelParticipation(id, {
      onSuccess: async () => {
        await cancelSheet.close()
        cancelDoneSheet.open()
      },
      onFailure: (message) => showFailure(cancelSheet.close, message),
    })

  const handleApprove = (participationId: string) =>
    approveParticipation(participationId, {
      onSuccess: approveDoneSheet.open,
      onFailure: (message) => showFailure(noSheet, message),
    })

  return {
    joinDoneSheet,
    joinPendingSheet,
    cancelSheet,
    cancelDoneSheet,
    approveDoneSheet,
    isJoining,
    isCanceling,
    isApproving,
    handleJoin,
    handleCancelRequest: cancelSheet.open,
    handleCancelConfirm,
    handleApprove,
  }
}

export type ParticipationSheetsState = ReturnType<typeof useParticipationSheets>
