import type { ReactNode } from 'react'
import { Title } from '../Title'

// In-page section header: mono kicker + modest white Bebas h2 (v4 173–175).
// `id` lets the hub anchor #bioscale / #oidat / #academy targets here.
export function Section({
  kicker,
  title,
  id,
  children,
}: {
  kicker: string
  title: string
  id?: string
  children?: ReactNode
}) {
  return (
    <section className="sec" id={id}>
      <p className="sec-kicker">{kicker}</p>
      <h2 className="sec-h2">
        <Title>{title}</Title>
      </h2>
      {children}
    </section>
  )
}
