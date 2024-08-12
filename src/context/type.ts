import { Asset } from '../types'

export enum Filter {
  ENERGY_SENSOR = 'ENERGY_SENSOR',
  CRITICAL = 'CRITICAL',
}

export type FilterType = Filter | null

export type Company = {
  name: string
  id: string
}

export interface CompanyContextProps {
  activeCompany: Company | null
  search: string
  activeFilter: FilterType
  activeAsset: Asset | null

  handleActiveCompany: (nextCompany: Company) => void
  handleSearch: (query: string) => void
  handleActiveFilter: (nextFilter: FilterType) => void
  handleActiveAsset: (nextAsset: Asset) => void
}
