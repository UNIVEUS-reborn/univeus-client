import { useState } from 'react'

import { useCloseGroup } from '@src/pages/pageGroupDetail/hooks/useCloseGroup'
import { useDeleteGroup } from '@src/pages/pageGroupDetail/hooks/useDeleteGroup'
import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'

type Group = {
  id: string
  groupId: string
  category: string
}

function useSheet(modalId: string) {
  const [isOpen, open, close] = useStepFlowModalState(Activity.GROUP_DETAIL, modalId)
  return { isOpen, open, close }
}

export function useGroupDetailSheets({ id, groupId, category }: Group) {
  const { push, pop } = useFlow()
  const closeSheet = useSheet('close')
  const closeDoneSheet = useSheet('close-done')
  const manageSheet = useSheet('manage')
  const deleteSheet = useSheet('delete')
  const deleteDoneSheet = useSheet('delete-done')
  const failureSheet = useSheet('failure')
  const [failureMessage, setFailureMessage] = useState('')
  const { closeGroup, isInFlight: isClosing } = useCloseGroup()
  const { deleteGroup, isInFlight: isDeleting } = useDeleteGroup()

  const showFailure = async (closeCurrent: () => Promise<void>, message: string) => {
    await closeCurrent()
    setFailureMessage(message)
    failureSheet.open()
  }

  const handleCloseConfirm = () =>
    closeGroup(id, {
      onSuccess: async () => {
        await closeSheet.close()
        closeDoneSheet.open()
      },
      onFailure: (message) => showFailure(closeSheet.close, message),
    })

  const handleEdit = async () => {
    await manageSheet.close()
    push(Activity.GROUP_EDIT, { groupId })
  }

  const handleDeleteRequest = async () => {
    await manageSheet.close()
    deleteSheet.open()
  }

  const handleDeleteConfirm = () =>
    deleteGroup(id, category, {
      onSuccess: async () => {
        await deleteSheet.close()
        deleteDoneSheet.open()
      },
      onFailure: (message) => showFailure(deleteSheet.close, message),
    })

  return {
    closeSheet,
    closeDoneSheet,
    manageSheet,
    deleteSheet,
    deleteDoneSheet,
    failureSheet,
    failureMessage,
    isClosing,
    isDeleting,
    handleCloseConfirm,
    handleEdit,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteDone: () => pop(),
  }
}

export type GroupDetailSheetsState = ReturnType<typeof useGroupDetailSheets>
