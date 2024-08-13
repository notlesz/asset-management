import { createContext, useReducer } from 'react'
import { Company, FilterType, CompanyContextProps } from './type'

import reducer, { ActionTypes, INITIAL_STATE } from './reducer'
import { Asset } from '../types'

export const CompanyContext = createContext<CompanyContextProps | null>(null)

export default function CompanyContextProvider({ children }: { children: React.ReactNode }) {
  const [unitData, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleActiveCompany = (nextUnit: Company) => {
    handleActiveFilter(null)
    handleSearch('')

    dispatch({
      type: ActionTypes.SET_ACTIVE_UNIT,
      payload: nextUnit,
    })
  }

  const handleSearch = (query: string | null) =>
    dispatch({
      type: ActionTypes.SET_SEARCH,
      payload: query,
    })

  const handleActiveFilter = (nextFilter: FilterType) => {
    dispatch({
      type: ActionTypes.SET_ACTIVE_FILTER,
      payload: nextFilter,
    })
  }

  const handleActiveAsset = (nextAsset: Asset) => {
    dispatch({
      type: ActionTypes.SET_ACTIVE_ASSET,
      payload: nextAsset,
    })
  }

  const props = {
    ...unitData,
    handleActiveCompany,
    handleSearch,
    handleActiveFilter,
    handleActiveAsset,
  }

  return <CompanyContext.Provider value={props}>{children}</CompanyContext.Provider>
}
