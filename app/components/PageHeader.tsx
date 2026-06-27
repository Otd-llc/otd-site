import { Fragment } from 'react'
import type { ReactNode } from 'react'

// Page header matching the academy: a gold-gradient `.title-rule`, a gold `.ord`
// eyebrow, and a chonky `.bench-hero` Bebas title whose CONTENT words alternate
// ivory -> gold (function words stay ivory), ending in a hollow `.tdot` period.
//
// ASCII word regexes on purpose: the apex tsconfig targets pre-ES6, so the
// `\p{...}` unicode property escapes the academy uses aren't available here.

const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'to', 'of', 'and', 'or', 'for', 'in', 'on', 'at', 'by',
  'as', 'it', 'is', 'its', 'with', 'from', 'into', 'onto', 'per', 'via', 'vs',
  'but', 'no',
])

function wordKey(token: string): string {
  return token.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
}

/** A real (gold-eligible) word: has letters/digits and isn't a function word. */
export function isContentWord(token: string): boolean {
  const k = wordKey(token)
  return k.length > 0 && !FUNCTION_WORDS.has(k)
}

/**
 * Render `title` with the house alternation: ivory -> gold across the CONTENT
 * words (first ivory, second gold, third ivory, ...). Function words stay ivory
 * and never shift the cadence. Periods become hollow `.tdot` spans.
 */
function highlightTitle(title: string): ReactNode[] {
  const trimmed = title.trim()

  const text = (s: string, key: string): ReactNode => {
    if (!s.includes('.')) return s
    return s.split(/(\.)/g).map((part, i) =>
      part === '.' ? (
        <span key={`${key}-${i}`} className="tdot">
          .
        </span>
      ) : (
        <Fragment key={`${key}-${i}`}>{part}</Fragment>
      ),
    )
  }

  let content = 0
  return trimmed.split(/(\s+)/).map((tok, i) => {
    if (tok === '' || /^\s+$/.test(tok)) {
      return <Fragment key={i}>{tok}</Fragment>
    }
    const m = tok.match(/^([^A-Za-z0-9]*)([A-Za-z0-9](?:.*[A-Za-z0-9])?)?([^A-Za-z0-9]*)$/)
    const pre = m?.[1] ?? ''
    const core = m?.[2] ?? ''
    const post = m?.[3] ?? ''
    if (core) {
      const gold = isContentWord(core) && ++content % 2 === 0
      return (
        <Fragment key={i}>
          {text(pre, `${i}p`)}
          {gold ? <span className="accent">{core}</span> : core}
          {text(post, `${i}o`)}
        </Fragment>
      )
    }
    return <Fragment key={i}>{text(tok, `${i}w`)}</Fragment>
  })
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  const titleNodes = highlightTitle(title)
  // One-word titles have no gold word, so the gold moves to the period; titles
  // with two-plus content words carry a gold word, so the period stays ivory.
  const hasGoldWord = title.trim().split(/\s+/).filter(isContentWord).length >= 2
  const needsPeriod = !/[.!?…]$/.test(title.trim())

  return (
    <header className="page-head">
      <div className="title-rule" aria-hidden="true" />
      <h1 className="bench-hero">
        <span className="ord">{eyebrow}</span>
        <span className="hero-line">
          <span>
            {titleNodes}
            {needsPeriod ? (
              <span className={hasGoldWord ? 'tdot' : 'tdot accent'}>.</span>
            ) : null}
          </span>
        </span>
      </h1>
      {lead ? <p className="subhead">{lead}</p> : null}
    </header>
  )
}
