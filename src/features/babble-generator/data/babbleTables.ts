import { medicalTableContents, technoTableContents } from './tableContents'

export type D20 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

export type GeneratorKind = 'techno' | 'medical'

export type TableColumn<TColumn extends string> = {
  key: TColumn
  label: string
  entries: readonly string[]
}

export type D20Table<TColumn extends string> = {
  id: GeneratorKind
  title: string
  columns: readonly TableColumn<TColumn>[]
}

export type TableRow<TColumn extends string> = {
  roll: number
  values: Record<TColumn, string>
}

export type TechnoColumn = 'action' | 'descriptor' | 'source' | 'effect' | 'device'
export type MedicalColumn = 'illnessInjury' | 'cause' | 'primaryTreatment' | 'secondaryTreatment'

const REQUIRED_D20_ENTRIES = 20

function createColumn<TColumn extends string>(
  key: TColumn,
  label: string,
  entries: readonly string[],
): TableColumn<TColumn> {
  if (entries.length !== REQUIRED_D20_ENTRIES) {
    throw new Error(`${label} must contain exactly ${REQUIRED_D20_ENTRIES} entries.`)
  }

  return { key, label, entries }
}

export function getTableRows<TColumn extends string>(table: D20Table<TColumn>): TableRow<TColumn>[] {
  return Array.from({ length: REQUIRED_D20_ENTRIES }, (_, index) => ({
    roll: index + 1,
    values: Object.fromEntries(
      table.columns.map(({ key, entries }) => [key, entries[index]]),
    ) as Record<TColumn, string>,
  }))
}

export const technoBabbleTable = {
  id: 'techno',
  title: 'Treknobabble Generator',
  columns: [
    createColumn('action', 'Action', technoTableContents.actions),
    createColumn('descriptor', 'Descriptor', technoTableContents.descriptors),
    createColumn('source', 'Source', technoTableContents.sources),
    createColumn('effect', 'Effect', technoTableContents.effects),
    createColumn('device', 'Device', technoTableContents.devices),
  ],
} as const satisfies D20Table<TechnoColumn>

export const medicalBabbleTable = {
  id: 'medical',
  title: 'Medical-Babble Generator',
  columns: [
    createColumn('illnessInjury', 'Illness/Injury', medicalTableContents.illnessesInjuries),
    createColumn('cause', 'Cause', medicalTableContents.causes),
    createColumn('primaryTreatment', 'Primary Treatment', medicalTableContents.primaryTreatments),
    createColumn('secondaryTreatment', 'Secondary Treatment', medicalTableContents.secondaryTreatments),
  ],
} as const satisfies D20Table<MedicalColumn>

export const babbleTables = {
  techno: technoBabbleTable,
  medical: medicalBabbleTable,
} as const
