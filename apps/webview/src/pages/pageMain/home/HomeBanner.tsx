import * as stylex from '@stylexjs/stylex'
import { useEffect, useRef, useState } from 'react'

import booth from '@src/assets/group/booth_banner.png'
import guide from '@src/assets/group/guide_banner.png'
import univeus from '@src/assets/group/univeus_banner.png'
import use from '@src/assets/group/use_banner.png'
import { colors, radius, space } from '@src/styles/tokens.stylex'

const banners = [
  { image: guide, alt: '사용설명 배너 이미지', url: 'https://www.instagram.com/p/CxFp6WeRD6J/' },
  {
    image: univeus,
    alt: '유니버스 소개 배너 이미지',
    url: 'https://univeus.oopy.io/0c56334b-c527-49ed-92a4-8f95d8c19dd6',
  },
  { image: use, alt: '이용약관 배너 이미지', url: 'https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a' },
  { image: booth, alt: '부스 소개 배너 이미지', url: null },
]

export function HomeBanner() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const scrollTo = (next: number) => {
    const track = trackRef.current
    if (track !== null) {
      track.scrollTo({ left: track.clientWidth * next, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const timer = setInterval(() => scrollTo((index + 1) % banners.length), 5000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <div {...stylex.props(styles.banner)}>
      <div
        ref={trackRef}
        onScroll={(event) => setIndex(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}
        {...stylex.props(styles.track)}
      >
        {banners.map(({ image, alt, url }) => (
          <button
            key={alt}
            type="button"
            disabled={url === null}
            onClick={() => url !== null && window.open(url, '_blank')}
            {...stylex.props(styles.slide)}
          >
            <img src={image} alt={alt} {...stylex.props(styles.image)} />
          </button>
        ))}
      </div>
      <div {...stylex.props(styles.dots)}>
        {banners.map(({ alt }, dotIndex) => (
          <button
            key={alt}
            type="button"
            aria-label={`${dotIndex + 1}번째 배너`}
            aria-current={dotIndex === index}
            onClick={() => scrollTo(dotIndex)}
            {...stylex.props(styles.dot, dotIndex === index && styles.activeDot)}
          />
        ))}
      </div>
    </div>
  )
}

const styles = stylex.create({
  banner: {
    position: 'relative',
    marginTop: space.x3,
  },
  track: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    borderRadius: radius.md,
  },
  slide: {
    flexShrink: 0,
    width: '100%',
    height: '120px',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    scrollSnapAlign: 'start',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: radius.md,
  },
  dots: {
    position: 'absolute',
    bottom: space.x2,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: space.x1,
  },
  dot: {
    width: space.x2,
    height: space.x2,
    padding: 0,
    borderStyle: 'none',
    borderRadius: radius.full,
    backgroundColor: colors.background,
  },
  activeDot: {
    backgroundColor: colors.brandStrong,
  },
})
