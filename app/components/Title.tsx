import { Fragment, type ReactNode } from 'react'

// The academy title rules, ported. Render a title string with the house
// alternation: content words alternate ivory -> gold (first ivory), small
// function words (the / to / of / ...) stay ivory and never shift the cadence.
// Every period is a hollow `.tdot` span; a trailing period is appended when the
// title has none. The period is ivory when the title carries a gold word, gold
// when it does not (a one-word title). Mirrors src/components/PageHeader.tsx in
// the academy so both sites colour titles identically.

const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'to', 'of', 'and', 'or', 'for', 'in', 'on', 'at', 'by',
  'as', 'it', 'is', 'its', 'with', 'from', 'into', 'onto', 'per', 'via', 'vs',
  'but', 'no',
])

const wordKey = (token: string) =>
  token.toLowerCase().replace(/[^a-z0-9]/g, '')

function isContentWord(token: string): boolean {
  const k = wordKey(token)
  return k.length > 0 && !FUNCTION_WORDS.has(k)
}

export function Title({ children }: { children: string }) {
  const trimmed = children.trim()

  const dots = (s: string, key: string): ReactNode =>
    !s.includes('.')
      ? s
      : s.split(/(\.)/g).map((part, i) =>
          part === '.' ? (
            <span key={`${key}-${i}`} className="tdot">
              .
            </span>
          ) : (
            <Fragment key={`${key}-${i}`}>{part}</Fragment>
          ),
        )

  let content = 0
  const nodes = trimmed.split(/(\s+)/).map((tok, i) => {
    if (tok === '' || /^\s+$/.test(tok)) {
      return <Fragment key={i}>{tok}</Fragment>
    }
    const m = tok.match(
      /^([^A-Za-z0-9]*)([A-Za-z0-9](?:.*[A-Za-z0-9])?)?([^A-Za-z0-9]*)$/,
    )
    const pre = m?.[1] ?? ''
    const core = m?.[2] ?? ''
    const post = m?.[3] ?? ''
    if (core) {
      const gold = isContentWord(core) && ++content % 2 === 0
      return (
        <Fragment key={i}>
          {dots(pre, `${i}p`)}
          {gold ? <span className="accent">{core}</span> : core}
          {dots(post, `${i}o`)}
        </Fragment>
      )
    }
    return <Fragment key={i}>{dots(tok, `${i}w`)}</Fragment>
  })

  const hasGoldWord =
    trimmed.split(/\s+/).filter(isContentWord).length >= 2
  const needsPeriod = !/[.!?…]$/.test(trimmed)

  return (
    <>
      {nodes}
      {needsPeriod ? (
        <span className={hasGoldWord ? 'tdot' : 'tdot accent'}>.</span>
      ) : null}
    </>
  )
}
