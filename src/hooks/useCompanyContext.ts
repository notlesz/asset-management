import { useContext } from 'react'
import { CompanyContext } from '../context/CompanyContext'

export default function useCompanyContext() {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyContextProvider!')
  }

  return context
}
