import { useQuery } from '@tanstack/react-query'
import { getAssets, getLocations } from '../service/api'
import { useMemo } from 'react'

import buildTree from '../utils/build-unit-tree'
import filterUnit from '../utils/filter-unit'
import { Company, FilterType } from '../context/type'

interface UseCompanyTreeProps {
  activeCompany: Company | null
  activeFilter: FilterType
  search: string
}

export default function useCompanyTree({ activeCompany, activeFilter, search }: UseCompanyTreeProps) {
  const { data: assets, isLoading: isLoadingAssets } = useQuery({
    queryKey: ['assets', activeCompany],
    queryFn: () => getAssets(activeCompany!.id),
    enabled: !!activeCompany,
  })

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ['locations', activeCompany],
    queryFn: () => getLocations(activeCompany!.id),
    enabled: !!activeCompany,
  })

  const buildCompanyTree = useMemo(() => {
    if (assets && locations) {
      return buildTree(locations, assets)
    }

    return []
  }, [assets, locations])

  const listUnitsFiltered = useMemo(
    () => filterUnit([...buildCompanyTree], { search, activeFilter }),
    [search, activeFilter, buildCompanyTree]
  )

  const isLoading = isLoadingAssets || isLoadingLocations

  return {
    companyTree: listUnitsFiltered,
    isLoading,
  }
}
