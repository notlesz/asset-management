import { useCallback, useEffect, useState } from 'react'
import { Asset } from '../types'
import buildTree, { TreeNode } from '../utils/build-unit-tree'

export const fetcherUnit = async (unit: string) => {
  const assets = await fetch(`/data/${unit}/assets.json`)
    .then((res) => res.json())
    .catch(() => [])

  const locations = await fetch(`/data/${unit}/locations.json`)
    .then((res) => res.json())
    .catch(() => [])

  return {
    assets,
    locations,
  }
}

export default function useUnitByName(unitName: string) {
  const [unitList, setUnitList] = useState<TreeNode[]>([])

  const getUnit = useCallback(async (unitName: string) => {
    const { assets, locations } = await fetcherUnit(unitName)

    const unitTree = buildTree(locations, assets as Asset[])

    setUnitList(unitTree)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      await getUnit(unitName)
    })()
  }, [unitName, getUnit])

  return unitList
}
