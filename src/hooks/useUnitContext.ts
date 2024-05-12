import { useContext } from 'react'
import { UnitContext } from '../context/UnitContext'

export default function useUnitContext() {
  const context = useContext(UnitContext)

  if (!context) {
    throw new Error('useUnitContext must be used within a UnitContextProvider!')
  }

  return context
}
