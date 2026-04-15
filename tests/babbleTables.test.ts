import { describe, expect, test } from '@jest/globals'
import { babbleTables, getTableRows } from '../src/features/babble-generator/data/babbleTables'
import { resultInstructions } from '../src/features/babble-generator/data/resultInstructions'

describe('babble table data', () => {
  test('each table column has exactly twenty d20 entries', () => {
    Object.values(babbleTables).forEach((table) => {
      table.columns.forEach((column) => {
        expect(column.entries).toHaveLength(20)
      })
    })
  })

  test('derives source rows from column-first table contents', () => {
    const rows = getTableRows(babbleTables.techno)

    expect(rows).toHaveLength(20)
    expect(rows[0]).toEqual({
      roll: 1,
      values: {
        action: '(re)initialize',
        descriptor: 'multiphasic',
        device: 'discriminator',
        effect: 'gravitic',
        source: 'thermal',
      },
    })
    expect(rows[19].values).toMatchObject({
      action: '(de/re)construct',
      descriptor: 'cyclic',
      source: 'tetryon',
      effect: 'beam',
      device: 'emitter',
    })
  })

  test('has instructions for every generator kind', () => {
    expect(resultInstructions.techno).toContain('TRAINED STARFLEET ENGINEER')
    expect(resultInstructions.medical).toContain('MEDICAL CONDITIONS')
  })
})
