import { describe, expect, test } from '@jest/globals'
import { babbleTables } from '../src/features/babble-generator/data/babbleTables'
import { generateForKind, getBabbleTable, updateResultRoll } from '../src/features/babble-generator/logic/babbleResult'
import { generateBabble, rollD20 } from '../src/features/babble-generator/logic/generator'

describe('rollD20', () => {
  test('returns the minimum d20 value', () => {
    expect(rollD20(() => 0)).toBe(1)
  })

  test('returns the maximum d20 value', () => {
    expect(rollD20(() => 0.999)).toBe(20)
  })

  test('maps the random range to d20 values', () => {
    expect(rollD20(() => 0.5)).toBe(11)
  })
})

describe('generateBabble', () => {
  test('rolls once for each table column', () => {
    const result = generateBabble(babbleTables.techno, () => 0)

    expect(result.rolls).toHaveLength(babbleTables.techno.columns.length)
    expect(result.rolls.map(({ roll }) => roll)).toEqual([1, 1, 1, 1, 1])
  })

  test('combines selected column entries into a phrase', () => {
    const result = generateBabble(babbleTables.techno, () => 0)

    expect(result.phrase).toBe('(re)initialize multiphasic thermal gravitic discriminator')
  })

  test('uses the correct table for a generator kind', () => {
    expect(getBabbleTable('techno').title).toBe('Treknobabble Generator')
    expect(getBabbleTable('medical').title).toBe('Medical-Babble Generator')
  })

  test('generates the expected medical result with deterministic rolls', () => {
    const result = generateForKind('medical')

    expect(result.rolls).toHaveLength(4)
    expect(result.phrase).toEqual(expect.any(String))
  })
})

describe('updateResultRoll', () => {
  test('updates one roll while preserving the others', () => {
    const initial = generateBabble(babbleTables.techno, () => 0)
    const updated = updateResultRoll(initial, babbleTables.techno, 'action', 20)

    expect(updated.rolls[0]).toMatchObject({
      column: 'action',
      roll: 20,
      value: '(de/re)construct',
    })
    expect(updated.rolls.slice(1)).toEqual(initial.rolls.slice(1))
    expect(updated.phrase).toBe('(de/re)construct multiphasic thermal gravitic discriminator')
  })

  test('returns the original result when the column does not exist', () => {
    const initial = generateBabble(babbleTables.techno, () => 0)

    expect(updateResultRoll(initial, babbleTables.techno, 'missing-column', 3)).toBe(initial)
  })
})
