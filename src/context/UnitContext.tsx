import { createContext, useEffect, useMemo, useReducer } from 'react'
import { AVAILABLE_UNITS, LOCAL_STORAGE_UNIT_ACTIVE_FILTER } from '../constants'
import { ActiveUnitType, FilterType, UnitContextProps } from './type'

import useUnitByName from '../hooks/useUnitByName'
import filterUnit from '../utils/filter-unit'
import { getLocaStorageItem, setLocalStorageItem } from '../utils/local-storage'
import reducer, { ActionTypes, INITIAL_STATE } from './reducer'

export const UnitContext = createContext<UnitContextProps | null>(null)

export default function UnitContextProvider({ children }: { children: React.ReactNode }) {
  const [unitData, dispatch] = useReducer(reducer, INITIAL_STATE)

  const { search, activeFilter } = unitData

  const listUnits = useUnitByName(unitData.activeUnit.value)

  const listUnitsFiltered = useMemo(
    () => filterUnit([...listUnits], { search, activeFilter }),
    [search, activeFilter, listUnits]
  )

  const handleActiveUnit = (nextUnit: ActiveUnitType) => {
    dispatch({
      type: ActionTypes.SET_ACTIVE_UNIT,
      payload: nextUnit,
    })

    setLocalStorageItem(LOCAL_STORAGE_UNIT_ACTIVE_FILTER, JSON.stringify(nextUnit))
  }

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
    unitList: listUnitsFiltered,
  }

  useEffect(() => {
    const unitFilterStored = getLocaStorageItem(LOCAL_STORAGE_UNIT_ACTIVE_FILTER)

    if (unitFilterStored) {
      dispatch({
        type: ActionTypes.SET_ACTIVE_UNIT,
        payload: JSON.parse(unitFilterStored),
      })
    }
  }, [])

  return <UnitContext.Provider value={props}>{children}</UnitContext.Provider>
}
