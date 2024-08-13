import useUnitContext from '../hooks/useCompanyContext'
import ComponentData from './ComponentData'
import Search from './Search'
import TreeView from './TreeView'
import useCompanyTree from '../hooks/useCompanyTree'
import Filters from './Filters'
import { useCallback, useEffect, useState } from 'react'
import { TreeNode } from '../utils/build-company-tree'
import { Filter } from '../context/type'
import { Sensor, Status } from '../types'

const getParents = (node: TreeNode, treeMap: Map<string, TreeNode>) => {
  const parents = []
  let current = node
  while (current.parentId) {
    current = treeMap.get(current.parentId) as TreeNode
    if (current) {
      parents.unshift(current.id)
    } else {
      break
    }
  }

  return parents
}

const matchFilter = (node: TreeNode, activeFilter: Filter | null, search: string): boolean => {
  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  const matchEnergySensor = isEnergySensorFilter && node.sensorType === Sensor.ENERGY
  const matchCriticalFilter = isCriticalFilter && node.status === Status.ALERT
  const matchSearch = node.name.toLowerCase().includes(search.toLowerCase())

  return matchEnergySensor || matchCriticalFilter || matchSearch
}

export default function CompanyContent() {
  const { activeCompany, activeFilter, search, activeAsset, handleSearch, handleActiveAsset } = useUnitContext()

  const { companyNodes, companyRoot, isLoading } = useCompanyTree({ activeCompany, activeFilter, search })

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const hasData = !!companyRoot.length

  const handleToggle = useCallback(
    (node: TreeNode, isComponentType: boolean) => {
      const { id, name, locationId, sensorType, status, parentId, gatewayId, sensorId } = node

      setExpandedNodes((prevExpanded) => {
        const newExpanded = new Set(prevExpanded)
        if (newExpanded.has(node.id)) {
          newExpanded.delete(node.id)
        } else {
          newExpanded.add(node.id)
        }
        return newExpanded
      })
      if (isComponentType) {
        handleActiveAsset({ id, name, locationId: locationId!, sensorType, status, parentId, gatewayId, sensorId })
      }
    },
    [handleActiveAsset]
  )

  useEffect(() => {
    const nodesToExpand = new Set() as Set<string>
    if (search || activeFilter) {
      companyNodes.forEach((node) => {
        const nodeMatchesFilter = matchFilter(node, activeFilter, search)
        if (nodeMatchesFilter) {
          const ancestors = getParents(node, companyNodes)
          console.log(ancestors)

          ancestors.forEach((id) => nodesToExpand.add(id))

          nodesToExpand.add(node.id)
        }
      })

      companyNodes.forEach((node) => {
        if (node.children && node.children.some((child: TreeNode) => nodesToExpand.has(child.id))) {
          nodesToExpand.add(node.id)
        }
      })
    }
    setExpandedNodes(nodesToExpand)
  }, [search, companyNodes, activeFilter])

  return (
    <div className="flex flex-col gap-3 h-full bg-white border rounded border-card px-4 py-[18px] overflow-hidden">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-950 text-xl font-semibold mr-2 inline">Ativos</h3>
          <span className="text-gray-600 text-sm font-normal align-text-top">/ {activeCompany?.name}</span>
        </div>
        <Filters />
      </header>
      <main className="flex-1 flex gap-2 overflow-hidden">
        <section className="flex flex-1 flex-col border rounded border-card ">
          <Search value={search} handleSearch={handleSearch} />
          <div className="h-full">
            {isLoading ? (
              <span className="text-gray-600 text-sm block text-center mt-4">Carregando...</span>
            ) : hasData ? (
              <TreeView
                data={companyRoot}
                onClickAsset={handleToggle}
                activeAsset={activeAsset}
                expandedNodes={expandedNodes}
              />
            ) : (
              <span className="text-gray-600 text-sm block text-center mt-4">
                Nenhum Ativo ou Local encontrado! <br /> Limpe a pesquisa ou os filtros para ver os items disponíveis.
              </span>
            )}
          </div>
        </section>
        <ComponentData />
      </main>
    </div>
  )
}
