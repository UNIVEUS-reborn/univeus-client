import * as stylex from '@stylexjs/stylex'

import female from '@src/assets/group/female.svg'
import male from '@src/assets/group/male.svg'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

type GenderRestriction = 'ANY' | 'MALE_ONLY' | 'FEMALE_ONLY' | '%future added value'

type Props = {
  genderRestriction: GenderRestriction
  variant: 'card' | 'detail'
}

export function GenderSticker({ genderRestriction, variant }: Props) {
  switch (genderRestriction) {
    case 'MALE_ONLY':
      return <Sticker icon={male} label="남자만" variant={variant} color={styles.male} />
    case 'FEMALE_ONLY':
      return <Sticker icon={female} label="여자만" variant={variant} color={styles.female} />
    case 'ANY':
    case '%future added value':
      return null
  }
}

type StickerProps = {
  icon: string
  label: string
  variant: 'card' | 'detail'
  color: stylex.StyleXStyles
}

function Sticker({ icon, label, variant, color }: StickerProps) {
  const iconSize = variant === 'card' ? 10 : 14
  return (
    <span aria-label={label} {...stylex.props(styles.sticker, styles[variant], color)}>
      <img src={icon} alt="" width={iconSize} height={iconSize} />
      <span {...stylex.props(variant === 'card' ? styles.cardText : styles.detailText)}>ONLY</span>
    </span>
  )
}

const styles = stylex.create({
  sticker: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    borderRadius: radius.md,
    color: colors.onBrand,
  },
  card: {
    paddingBlock: space.x1,
    paddingInline: '6px',
  },
  detail: {
    paddingBlock: '3px',
    paddingInline: space.x2,
  },
  male: {
    backgroundColor: colors.genderMale,
  },
  female: {
    backgroundColor: colors.genderFemale,
  },
  cardText: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.bold,
  },
  detailText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
})
