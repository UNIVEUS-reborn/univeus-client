import { ScreenBoundary } from '@src/components/shared/ScreenBoundary'
import { IntroductionScreen } from '@src/pages/pageIntroduction/IntroductionScreen'

export function IntroductionPage() {
  return (
    <ScreenBoundary>
      <IntroductionScreen />
    </ScreenBoundary>
  )
}
