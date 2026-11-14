import { AppScreen } from '@stackflow/plugin-basic-ui'
import * as stylex from '@stylexjs/stylex'
import { Suspense, type ReactNode } from 'react'

import { ErrorBoundary } from '@src/components/shared/ErrorBoundary'
import { Spinner } from '@src/components/shared/Spinner'
import { colors, shadow } from '@src/styles/tokens.stylex'

type Props = {
  title?: ReactNode
  renderLeft?: () => ReactNode
  renderRight?: () => ReactNode
  bottom?: ReactNode
  children: ReactNode
}

export function ScreenLayout({ title, renderLeft, renderRight, bottom, children }: Props) {
  return (
    <AppScreen appBar={{ title, renderLeft, renderRight, className: stylex.props(styles.appBar).className }}>
      <div {...stylex.props(styles.body)}>
        <main {...stylex.props(styles.content)}>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </ErrorBoundary>
        </main>
        {bottom}
      </div>
    </AppScreen>
  )
}

const styles = stylex.create({
  appBar: {
    boxShadow: shadow.header,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
})
