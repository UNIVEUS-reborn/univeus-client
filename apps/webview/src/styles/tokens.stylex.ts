import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
  background: '#ffffff',
  textPrimary: '#020617',
  textSecondary: '#334155',
  textTertiary: '#64748b',
  textDisabled: '#cbd5e1',
  border: '#e2e8f0',
  brand: '#6e7dff',
  brandWeak: '#f0f2ff',
  brandStrong: '#2f3db8',
  onBrand: '#ffffff',
  danger: '#fd6262',
  dangerWeak: '#ff8a8a',
  warning: '#ffc727',
  info: '#599fff',
})

export const fontSize = stylex.defineVars({
  xxs: '8px',
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
})

export const fontWeight = stylex.defineVars({
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
})

export const fontFamily = stylex.defineVars({
  base: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
})

export const space = stylex.defineVars({
  x1: '4px',
  x2: '8px',
  x3: '12px',
  x4: '16px',
  x5: '20px',
  x6: '24px',
  x7: '28px',
  x8: '32px',
})

export const radius = stylex.defineVars({
  sm: '5px',
  md: '10px',
  full: '9999px',
})

export const shadow = stylex.defineVars({
  header: '0 0.5px 10px rgba(0, 0, 0, 0.1)',
})

export const size = stylex.defineVars({
  headerHeight: '52px',
  bottomNavHeight: '60px',
  icon: '24px',
})
