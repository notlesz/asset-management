/* eslint-disable @typescript-eslint/no-explicit-any */

import { Asset } from '../types'
import { Company, FilterType } from './type'

export enum ActionTypes {
  SET_ACTIVE_UNIT = 'SET_ACTIVE_UNIT',
  SET_SEARCH = 'SET_SEARCH',
  SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER',
  SET_ACTIVE_ASSET = 'SET_ACTIVE_ASSET',
}

interface Action {
  type: ActionTypes
  payload: any
}

export interface UnitDataState {
  activeCompany: Company | null
  search: string
  activeFilter: FilterType | null
  activeAsset: Asset | null
}

export const INITIAL_STATE = {
  activeCompany: null,
  search: '',
  activeFilter: null,
  activeAsset: null,
}

const reducer = (state: UnitDataState, action: Action): UnitDataState => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_UNIT:
      return { ...state, activeCompany: action.payload }
    case ActionTypes.SET_SEARCH:
      return { ...state, search: action.payload }
    case ActionTypes.SET_ACTIVE_FILTER:
      return { ...state, activeFilter: state.activeFilter === action.payload ? null : action.payload }
    case ActionTypes.SET_ACTIVE_ASSET:
      return { ...state, activeAsset: action.payload }
    default:
      return state
  }
}

export default reducer
