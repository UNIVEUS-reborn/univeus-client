import * as stylex from '@stylexjs/stylex'
import { Component, type ReactNode } from 'react'

import { Button } from '@src/components/shared/Button'
import { colors, fontSize, space } from '@src/styles/tokens.stylex'

type Props = {
  children: ReactNode
  renderFallback?: (reset: () => void) => ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  reset = () => this.setState({ hasError: false })

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }
    return this.props.renderFallback?.(this.reset) ?? <ErrorView onRetry={this.reset} />
  }
}

export function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div {...stylex.props(styles.fallback)}>
      <p {...stylex.props(styles.text)}>불러오지 못했어요</p>
      <div {...stylex.props(styles.action)}>
        <Button variant="primary" onClick={onRetry}>
          다시 시도
        </Button>
      </div>
    </div>
  )
}

const styles = stylex.create({
  fallback: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space.x4,
    paddingTop: '30vh',
  },
  text: {
    margin: 0,
    color: colors.textTertiary,
    fontSize: fontSize.lg,
  },
  action: {
    display: 'flex',
    width: '50%',
  },
})
