import { Activity } from '@src/routes/activityNames'
import { useFlow } from '@src/stackflow/useFlow'

type ProfileTarget = {
  _id: string
  isViewer: boolean
}

export function useNavigateToProfile() {
  const { push } = useFlow()
  return ({ _id, isViewer }: ProfileTarget) =>
    isViewer ? push(Activity.MAIN, { tab: 'my' }) : push(Activity.USER_PROFILE, { userId: _id })
}
