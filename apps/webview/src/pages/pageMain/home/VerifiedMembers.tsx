import * as stylex from '@stylexjs/stylex'

import defaultImage from '@src/assets/group/default_image.png'
import personFill from '@src/assets/group/person_fill.svg'
import { PeopleIcon } from '@src/components/shared/icons'
import { VerifiedBadge } from '@src/components/shared/VerifiedBadge'
import { colors, fontSize, fontWeight, radius, shadow, space } from '@src/styles/tokens.stylex'

const members = [
  {
    category: '스펙쌓기',
    dday: 'D-1',
    people: '2/4',
    title: '저녁 메뉴는 뭘 먹을까',
    name: '소하',
    department: '19학번 / 소프트웨어경영대학',
  },
  {
    category: '우주공강',
    dday: 'D-10',
    people: '1/4',
    title: '점메추 받습니다',
    name: '행쨩',
    department: '21학번 / 창의공과대학',
  },
  {
    category: '우주공강',
    dday: 'D-10',
    people: '1/4',
    title: '점메추 받습니다',
    name: '행쨩',
    department: '21학번 / 창의공과대학',
  },
]

export function VerifiedMembers() {
  return (
    <section {...stylex.props(styles.section)}>
      <h2 {...stylex.props(styles.heading)}>검증된 멤버의 행성들이에요 🪐</h2>
      <div {...stylex.props(styles.list)}>
        {members.map((member, index) => (
          <div key={index} {...stylex.props(styles.card)}>
            <img src={defaultImage} alt="" {...stylex.props(styles.image)} />
            <div {...stylex.props(styles.content)}>
              <div {...stylex.props(styles.top)}>
                <div {...stylex.props(styles.tags)}>
                  <span {...stylex.props(styles.tag, styles.categoryTag)}>{member.category}</span>
                  <span {...stylex.props(styles.tag, styles.ddayTag)}>{member.dday}</span>
                </div>
                <span {...stylex.props(styles.people)}>
                  <PeopleIcon />
                  {member.people}
                </span>
              </div>
              <p {...stylex.props(styles.title)}>{member.title}</p>
              <div {...stylex.props(styles.user)}>
                <span {...stylex.props(styles.avatar)}>
                  <img src={personFill} alt="" width={14} height={14} />
                </span>
                <div>
                  <p {...stylex.props(styles.name)}>
                    {member.name}
                    <VerifiedBadge />
                  </p>
                  <p {...stylex.props(styles.department)}>{member.department}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles = stylex.create({
  section: {
    marginTop: space.x2,
  },
  heading: {
    margin: 0,
    marginBottom: '13px',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  list: {
    display: 'flex',
    gap: space.x2,
    overflowX: 'auto',
    padding: '10px',
    scrollbarWidth: 'none',
  },
  card: {
    display: 'flex',
    flexShrink: 0,
    width: '80%',
    height: '15vh',
    paddingBlock: '7px',
    paddingInline: '5px',
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    boxShadow: shadow.floating,
  },
  image: {
    width: '30vw',
    objectFit: 'cover',
    borderRadius: radius.sm,
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginInline: '5px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: fontSize.xxs,
  },
  tags: {
    display: 'flex',
    gap: '2px',
  },
  tag: {
    paddingBlock: space.x1,
    paddingInline: '6px',
    borderRadius: radius.md,
  },
  categoryTag: {
    backgroundColor: colors.brandWeak,
  },
  ddayTag: {
    backgroundColor: colors.genderFemale,
  },
  people: {
    display: 'flex',
    alignItems: 'center',
    color: colors.textPrimary,
  },
  title: {
    margin: 0,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.genderFemale,
    borderRadius: radius.full,
    backgroundColor: colors.brandWeak,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
    margin: 0,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  department: {
    margin: 0,
    fontSize: fontSize.xxs,
  },
})
