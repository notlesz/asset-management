import { TreeNode } from './build-company-tree'

export type NodeType = 'location' | 'sub-location' | 'asset' | 'component'

export const getNodeType = (node: TreeNode): NodeType => {
  const { parentId, sensorType } = node

  if (sensorType) return 'component'

  if (sensorType === null) return 'asset'

  if (parentId) return 'sub-location'

  return 'location'
}
