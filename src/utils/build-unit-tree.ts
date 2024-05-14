import { Asset, Location, SensorType, Status } from '../types'

export interface TreeNode {
  id: string
  name: string
  parentId: string | null
  locationId?: string | null
  children?: TreeNode[]
  sensorType?: SensorType
  status?: Status | null
}

export default function buildTree(locations: Location[], assets: Asset[]): TreeNode[] {
  const nodes: TreeNode[] = locations
    .map((loc) => ({
      ...loc,
      children: [],
    }))
    .concat(
      assets.map((asset) => ({
        ...asset,
        parentId: asset.locationId || asset.parentId,
        children: [],
      }))
    )

  const rootNodes: TreeNode[] = []
  const nodesById: { [key: string]: TreeNode } = {}

  nodes.forEach((node) => {
    nodesById[node.id] = node
    if (node.parentId === null) {
      rootNodes.push(node)
    } else {
      const parentNode = nodesById[node.parentId]
      if (parentNode) {
        parentNode.children = parentNode.children ? [...parentNode.children, node] : [node]
      }
    }
  })

  return rootNodes
}
