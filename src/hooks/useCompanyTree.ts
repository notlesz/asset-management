import { useQuery } from '@tanstack/react-query'
import { getAssets, getLocations } from '../service/api'
import { useEffect, useMemo, useState } from 'react'

import buildCompanyTree, { TreeNode } from '../utils/build-company-tree'
import { Company, FilterType } from '../context/type'
import filterCompanyTree from '../utils/filter-company-tree'

interface UseCompanyTreeProps {
  activeCompany: Company | null
  activeFilter: FilterType
  search: string
}

interface CompanyTree {
  tree: TreeNode[]
  map: Map<string, TreeNode>
}

export default function useCompanyTree({ activeCompany, activeFilter, search }: UseCompanyTreeProps) {
  const [companyTree, setCompanyTree] = useState<CompanyTree>({ tree: [], map: new Map<string, TreeNode>() })

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

  useEffect(() => {
    if (assets && locations) {
      const buildedTree = buildCompanyTree(locations, assets)
      setCompanyTree(buildedTree)
    }
  }, [assets, locations])

  const listUnitsFiltered = useMemo(
    () => filterCompanyTree(companyTree.tree, { search, activeFilter }),
    [search, activeFilter, companyTree]
  )

  const isLoading = isLoadingAssets || isLoadingLocations

  return {
    companyRoot: listUnitsFiltered,
    companyNodes: companyTree?.map,
    isLoading,
  }
}
