import { useMemo } from 'react'
import { useBabbleGenerator } from '../hooks/useBabbleGenerator'
import { getTableRows } from '../data/babbleTables'

export function SourceTable() {
  const { activeTable } = useBabbleGenerator()
  const tableRows = useMemo(() => getTableRows(activeTable), [activeTable])

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Source Data</p>
        <h2 id="table-title">{activeTable.title}</h2>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">D20</th>
              {activeTable.columns.map(({ key, label }) => (
                <th scope="col" key={key}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ roll, values }) => (
              <tr key={roll}>
                <th scope="row">{roll}</th>
                {activeTable.columns.map(({ key, label }) => (
                  <td data-label={label} key={key}>
                    {values[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
