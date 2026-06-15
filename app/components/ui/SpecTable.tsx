export type SpecRow = { ref: string; value: string }

// .table-tech spec table (v4 186–196).
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="table-tech">
      <thead>
        <tr>
          <th>Parameter</th>
          <th style={{ textAlign: 'right' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.ref}>
            <td>
              <span className="ref">{r.ref}</span>
            </td>
            <td className="v">{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
