import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight, radius, shadow } from '@src/styles/tokens.stylex'

type Tone = 'info' | 'brandStrong' | 'textSecondary'

const ROWS: { offset: string; keywords: [string, Tone][] }[] = [
  {
    offset: '9px',
    keywords: [
      ['축제 메이트', 'info'],
      ['프로젝트', 'brandStrong'],
      ['공모전', 'textSecondary'],
    ],
  },
  {
    offset: '54px',
    keywords: [
      ['대외활동', 'brandStrong'],
      ['밥MATE', 'textSecondary'],
      ['술MATE', 'info'],
    ],
  },
  {
    offset: '17px',
    keywords: [
      ['맛집 탐방', 'textSecondary'],
      ['팀원구인', 'info'],
      ['공부 MATE', 'brandStrong'],
    ],
  },
]

export function LandingKeywords() {
  return (
    <div {...stylex.props(styles.container)}>
      {ROWS.map(({ offset, keywords }) => (
        <div key={offset} {...stylex.props(styles.row, styles.offset(offset))}>
          {keywords.map(([label, tone]) => (
            <span key={label} {...stylex.props(styles.keyword, styles[tone])}>
              {label}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '13px',
    width: '95%',
    marginTop: '73px',
  },
  row: {
    display: 'flex',
    columnGap: '15px',
  },
  offset: (marginLeft: string) => ({
    marginLeft,
  }),
  keyword: {
    display: 'inline-block',
    paddingBlock: '10px',
    paddingInline: '17px',
    borderRadius: radius.full,
    backgroundColor: colors.background,
    boxShadow: shadow.floating,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  info: {
    color: colors.info,
  },
  brandStrong: {
    color: colors.brandStrong,
  },
  textSecondary: {
    color: colors.textSecondary,
  },
})
