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
  const nodesById = new Map<string, TreeNode>()
  const rootNodes: TreeNode[] = []

  const addChildNode = (parentId: string | undefined, childNode: TreeNode) => {
    const parentNode = parentId ? nodesById.get(parentId) : undefined
    if (parentNode) {
      parentNode.children!.push(childNode)
    } else {
      rootNodes.push(childNode)
    }
  }

  for (const location of locations) {
    const locNode: TreeNode = { ...location, children: [] }
    nodesById.set(locNode.id, locNode)
    addChildNode(locNode.parentId!, locNode)
  }

  for (const asset of assets) {
    const assetNode: TreeNode = { ...asset, children: [] }
    nodesById.set(assetNode.id, assetNode)
  }

  for (const node of nodesById.values()) {
    if (node.sensorType === undefined) {
      addChildNode(node.locationId!, node)
    } else {
      addChildNode(node.parentId! || node.locationId!, node)
    }
  }

  return rootNodes
}
