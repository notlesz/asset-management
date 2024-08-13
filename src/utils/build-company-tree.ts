import { Asset, Location, SensorType, Status } from '../types'

export interface TreeNode {
  id: string
  name: string
  level?: number
  parentId: string | null
  locationId?: string | null
  children?: TreeNode[]
  sensorType?: SensorType
  status?: Status | null
  gatewayId?: string | null
  sensorId?: string | null
}

const addNodeToParent = (
  node: TreeNode,
  parentId: string | null,
  nodesById: Map<string, TreeNode>,
  rootNodes: TreeNode[]
) => {
  if (parentId === null) {
    rootNodes.push(node)
  } else {
    const parent = nodesById.get(parentId)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(node)
    } else {
      rootNodes.push(node)
    }
  }
}

export default function buildCompanyTree(locations: Location[], assets: Asset[]) {
  const nodesById = new Map<string, TreeNode>()
  const rootNodes: TreeNode[] = []

  for (const location of locations) {
    const locNode: TreeNode = { ...location }
    nodesById.set(locNode.id, locNode)
    addNodeToParent(locNode, locNode.parentId, nodesById, rootNodes)
  }

  for (const asset of assets) {
    const assetNode: TreeNode = { ...asset }
    nodesById.set(assetNode.id, assetNode)
    addNodeToParent(assetNode, asset.locationId || asset.parentId || null, nodesById, rootNodes)
  }

  return { tree: rootNodes, map: nodesById }
}
