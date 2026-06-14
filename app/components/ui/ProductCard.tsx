import { SpecTable, type SpecRow } from './SpecTable'

// Academy course-card chrome (glass-card flex-col) + chip + Bebas title +
// Lora sub + table-tech (v4 182–197).
export function ProductCard({
  chip,
  chipBlue,
  title,
  sub,
  rows,
}: {
  chip: string
  chipBlue?: boolean
  title: string
  sub: string
  rows: SpecRow[]
}) {
  return (
    <div className="glass-card card">
      <span className={chipBlue ? 'chip blue' : 'chip'}>{chip}</span>
      <span className="card-title">{title}</span>
      <span className="card-sub">{sub}</span>
      <SpecTable rows={rows} />
    </div>
  )
}
