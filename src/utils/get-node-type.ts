import { TreeNode } from './build-unit-tree'

export type NodeType = 'location' | 'sub-location' | 'asset' | 'component'

export const getNodeType = (node: TreeNode): NodeType => {
  const { parentId, sensorType, locationId } = node

  if (sensorType) return 'component'

  if (locationId && !sensorType) return 'asset'

  if (parentId) return 'sub-location'

  return 'location'
}
