import { AVAILABLE_UNITS, INITIAL_UNIT_ACTIVE } from '../constants'
import { Asset } from '../types'
import { TreeNode } from '../utils/build-unit-tree'

export enum Filter {
  ENERGY_SENSOR = 'ENERGY_SENSOR',
  CRITICAL = 'CRITICAL',
}

export type FilterType = Filter | null

export type ActiveUnitType = typeof INITIAL_UNIT_ACTIVE

export type UnitListType = typeof AVAILABLE_UNITS

export interface UnitContextProps {
  activeUnit: ActiveUnitType
  availableUnits: UnitListType
  search: string
  activeFilter: FilterType
  activeAsset: Asset | null
  unitList: TreeNode[]
  handleActiveUnit: (nextActive: ActiveUnitType) => void
  handleSearch: (query: string) => void
  handleActiveFilter: (nextFilter: FilterType) => void
}
