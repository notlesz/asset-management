/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, useState } from 'react'
import { TreeNode } from '../utils/build-unit-tree'
import { cn } from '../utils/cn'

import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { FaBolt } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'

import { uniqueId } from 'lodash'
import { Virtuoso } from 'react-virtuoso'
import { Asset, SensorType, Status } from '../types'
import { NodeType, getNodeType } from '../utils/get-node-type'

interface ThreeViewProps {
  data: Array<TreeNode>
  onClickAsset: (nextAsset: Asset) => void
  activeAsset: Asset | null
}

interface NodeLabelProps {
  nodeType: NodeType
  hasChildren: boolean
  isCollapsed: boolean
  handleCollapsed: () => void
  labelValue: string
  sensorType?: SensorType
  status?: Status | null
  isSelectedComponent: boolean
}

interface NodeProps {
  node: TreeNode
  onClickAsset: (nextAsset: Asset) => void
  activeAsset: Asset | null
}

const getUniqueId = () => uniqueId()

const getIconByNodeType = (typeNode: NodeType) => {
  const availableIcons = {
    location: GoLocation,
    'sub-location': GoLocation,
    asset: IoCubeOutline,
    component: AiOutlineCodepen,
  }

  return availableIcons[typeNode]
}

const NodeLabel = ({
  handleCollapsed,
  hasChildren,
  isCollapsed,
  labelValue,
  nodeType,
  sensorType,
  status,
  isSelectedComponent,
}: NodeLabelProps) => {
  const isNodeComponent = nodeType === 'component'
  const isOperating = status === 'operating'
  const isAlert = status === 'alert'
  const isEnergySensor = sensorType === 'energy'

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleCollapsed()
    }
  }

  const Icon = getIconByNodeType(nodeType)

  return (
    <div
      tabIndex={0}
      className={cn('ps-5 my-4', {
        'cursor-pointer': hasChildren || isNodeComponent,
      })}
      onClick={(event) => {
        event.stopPropagation()
        handleCollapsed()
      }}
      onKeyDown={handleKeyPress}
    >
      <div
        className={cn('ps-1 flex items-center gap-2', {
          'bg-blue-500 text-white': isSelectedComponent,
        })}
      >
        {hasChildren && (
          <AiOutlineDown
            size={10}
            className={cn('', {
              'rotate-180': isCollapsed,
            })}
          />
        )}
        <Icon
          className={cn('text-blue-500', {
            'text-white': isSelectedComponent,
          })}
          size={22}
        />
        <span
          className={cn(
            'uppercase after:content=[" "] after:inline-block after:w-2 after:h-2 after:rounded after:ms-2',
            {
              'after:bg-green-500': isOperating,
              'after:bg-red-500': isAlert,
              'after:content-none': !isNodeComponent || isEnergySensor,
            }
          )}
        >
          {labelValue}
        </span>
        {isEnergySensor && <FaBolt className="text-green-500" />}
      </div>
    </div>
  )
}

const Node = ({ node, activeAsset, onClickAsset }: NodeProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { name, children, id, sensorType, status, locationId, parentId } = node

  const nodeType = getNodeType(node)

  const hasChildren = !!children && children.length > 0

  const isSelectedComponent = activeAsset?.id === node.id && nodeType === 'component'

  const handleCollapsed = () => {
    if (hasChildren) {
      setIsCollapsed(!isCollapsed)

      return
    }
    if (nodeType === 'component') {
      onClickAsset({
        id,
        locationId: locationId!,
        name,
        parentId,
        sensorType,
        status,
      })
    }
  }

  return (
    <div>
      <NodeLabel
        handleCollapsed={handleCollapsed}
        labelValue={name}
        hasChildren={hasChildren}
        isCollapsed={isCollapsed}
        nodeType={nodeType}
        sensorType={sensorType}
        status={status}
        isSelectedComponent={isSelectedComponent}
      />
      {hasChildren && (
        <ul
          className={cn('block ml-[1.5rem] ps-5', {
            hidden: !isCollapsed,
            'border-l border-card': hasChildren,
          })}
        >
          {children.map((row) => (
            <Node key={getUniqueId()} node={row} onClickAsset={onClickAsset} activeAsset={activeAsset} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default function TreeView({ data, activeAsset, onClickAsset }: ThreeViewProps) {
  return (
    <Virtuoso
      style={{ height: '100%' }}
      totalCount={data.length}
      itemContent={(index) => (
        <Node key={data[index].id} node={data[index]} onClickAsset={onClickAsset} activeAsset={activeAsset} />
      )}
    />
  )
}
