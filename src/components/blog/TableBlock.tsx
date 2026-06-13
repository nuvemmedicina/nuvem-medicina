type Row = { cells?: string[] }

type Props = {
  value: {
    caption?:   string
    hasHeader?: boolean
    rows?:      Row[]
  }
}

export function TableBlock({ value }: Props) {
  const { caption, hasHeader = true, rows = [] } = value
  if (!rows.length) return null

  const [headerRow, ...bodyRows] = rows
  const dataRows = hasHeader ? bodyRows : rows

  return (
    <figure className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        {hasHeader && headerRow?.cells && (
          <thead>
            <tr>
              {headerRow.cells.map((cell, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 font-semibold text-steel border border-teal/20 bg-teal/10 text-[0.82rem]"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {dataRows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? 'bg-teal/5' : ''}>
              {row.cells?.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2 border border-teal/15 text-steel/75 text-[0.85rem] leading-snug"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="text-center text-[0.75rem] text-steel/45 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
