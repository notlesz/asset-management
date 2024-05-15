import { Filter } from '../context/type'
import { Sensor, Status } from '../types'
import { TreeNode } from './build-unit-tree'

export default function filterUnit(
  units: TreeNode[],
  filter: { search: string; activeFilter: Filter | null }
): TreeNode[] {
  const { activeFilter, search } = filter

  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  if (!activeFilter && !search) return units

  return units.reduce((acc, curr) => {
    const { name, children, sensorType, status } = curr

    const matchEnergySensor = isEnergySensorFilter && sensorType === Sensor.ENERGY
    const matchCriticalFilter = isCriticalFilter && status === Status.ALERT && sensorType !== Sensor.ENERGY
    const matchSearch = search && name.toLowerCase().includes(search.toLowerCase())

    const hasChildren = children && children.length > 0

    const allMatch = matchEnergySensor || matchSearch || matchCriticalFilter

    if (allMatch) {
      acc.push(curr)
    }

    if (hasChildren) {
      const filteredChildren = filterUnit(children, filter)
      if (filteredChildren.length > 0) {
        acc.push({ ...curr, children: filteredChildren })
      }
    }

    return acc
  }, [] as TreeNode[])
}
