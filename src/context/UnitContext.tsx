import { createContext, useReducer } from 'react'
import { AVAILABLE_UNITS } from '../constants'
import { ActiveUnitType, FilterType, UnitContextProps } from './type'

import useUnitByName from '../hooks/useUnitByName'
import reducer, { ActionTypes, INITIAL_STATE } from './reducer'

export const UnitContext = createContext<UnitContextProps | null>(null)

export default function UnitContextProvider({ children }: { children: React.ReactNode }) {
  const [unitData, dispatch] = useReducer(reducer, INITIAL_STATE)

  const listUnits = useUnitByName(unitData.activeUnit.value)

  const handleActiveUnit = (nextUnit: ActiveUnitType) =>
    dispatch({
      type: ActionTypes.SET_ACTIVE_UNIT,
      payload: nextUnit,
    })

  const handleSearch = (query: string) =>
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

  const props = {
    availableUnits: AVAILABLE_UNITS,
    ...unitData,
    handleActiveUnit,
    handleSearch,
    handleActiveFilter,
    unitList: listUnits,
  }

  return <UnitContext.Provider value={props}>{children}</UnitContext.Provider>
}
