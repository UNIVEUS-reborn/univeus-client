import * as stylex from '@stylexjs/stylex'
import { Suspense, useState } from 'react'

import { SearchIcon } from '@src/components/shared/icons'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { Spinner } from '@src/components/shared/Spinner'
import { SearchResults } from '@src/pages/pageSearch/SearchResults'
import { colors, fontSize, fontWeight, radius, space } from '@src/styles/tokens.stylex'

export function SearchPage() {
  const [input, setInput] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)

  const handleSubmit = () => {
    const query = input.trim()
    if (query !== '') {
      setSubmittedQuery(query)
    }
  }

  return (
    <ScreenLayout>
      <div {...stylex.props(styles.body)}>
        <p {...stylex.props(styles.heading)}>
          어떤
          <br />
          <strong {...stylex.props(styles.bold)}>유니버스를 찾고 계신가요?</strong>
        </p>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
          {...stylex.props(styles.form)}
        >
          <button type="submit" aria-label="검색" {...stylex.props(styles.searchButton)}>
            <SearchIcon />
          </button>
          <input
            type="search"
            enterKeyHint="search"
            placeholder="검색어를 입력하세요"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            {...stylex.props(styles.input)}
          />
        </form>
        <hr {...stylex.props(styles.divider)} />
        {submittedQuery !== null && (
          <Suspense fallback={<Spinner />}>
            <SearchResults query={submittedQuery} />
          </Suspense>
        )}
      </div>
    </ScreenLayout>
  )
}

const styles = stylex.create({
  body: {
    width: '90%',
    marginInline: 'auto',
  },
  heading: {
    marginTop: '40px',
    marginBottom: 0,
    fontSize: fontSize.xxl,
    lineHeight: '30px',
  },
  bold: {
    fontWeight: fontWeight.semibold,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginTop: space.x5,
  },
  searchButton: {
    display: 'flex',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textTertiary,
  },
  input: {
    flex: 1,
    height: '33px',
    paddingLeft: '13px',
    borderStyle: 'none',
    borderRadius: radius.chip,
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: fontSize.lg,
    '::placeholder': {
      color: colors.textDisabled,
    },
  },
  divider: {
    marginTop: '10px',
    marginBottom: 0,
    borderWidth: 0,
    borderTopWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
})
