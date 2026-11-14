import { ScreenBoundary } from '@src/components/shared/ScreenBoundary'
import { UserProfileScreen } from '@src/pages/pageUserProfile/UserProfileScreen'

export function UserProfilePage() {
  return (
    <ScreenBoundary>
      <UserProfileScreen />
    </ScreenBoundary>
  )
}
