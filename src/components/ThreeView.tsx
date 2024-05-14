/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, useState } from 'react'
import { TreeNode } from '../utils/build-unit-tree'
import { cn } from '../utils/cn'

import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { FaBolt } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'

import { Virtuoso } from 'react-virtuoso'
import { SensorType, Status } from '../types'
import { NodeType, getNodeType } from '../utils/get-node-type'

interface ThreeViewProps {
  data: Array<TreeNode>
}

interface NodeLabelProps {
  nodeType: NodeType
  hasChildren: boolean
  isCollapsed: boolean
  handleCollapsed: () => void
  labelValue: string
  sensorType?: SensorType
  status?: Status
}

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
      className={cn('px-5 py-4 flex items-center gap-2', {
        'cursor-pointer': hasChildren || isNodeComponent,
      })}
      onClick={handleCollapsed}
      onKeyDown={handleKeyPress}
    >
      {hasChildren && (
        <AiOutlineDown
          size={10}
          className={cn('', {
            'rotate-180': isCollapsed,
          })}
        />
      )}
      <Icon color="#2188FF" size={22} />
      <span
        className={cn('after:content=[" "] after:inline-block after:w-2 after:h-2 after:rounded after:ms-2', {
          'after:bg-green-500': isOperating,
          'after:bg-red-500': isAlert,
          'after:content-none': !isNodeComponent || isEnergySensor,
        })}
      >
        {labelValue}
      </span>
      {isEnergySensor && <FaBolt className="text-green-500" />}
    </div>
  )
}

const Node = (node: TreeNode) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { name, children, id, sensorType, status } = node

  const nodeType = getNodeType(node)

  const hasChildren = !!children && children.length > 0

  const handleCollapsed = () => {
    if (hasChildren) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div id={id}>
      <NodeLabel
        handleCollapsed={handleCollapsed}
        labelValue={name}
        hasChildren={hasChildren}
        isCollapsed={isCollapsed}
        nodeType={nodeType}
        sensorType={sensorType}
        status={status}
      />
      {hasChildren && (
        <ul
          className={cn('block ml-[1.5rem] ps-5', {
            hidden: !isCollapsed,
            'border-l border-card': hasChildren,
          })}
        >
          {children.map((row) => (
            <Node key={row.id} {...row} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default function ThreeView({ data }: ThreeViewProps) {
  const hasData = !!data.length

  if (!hasData) {
    return (
      <span className="text-gray-600 text-sm block text-center mt-4">
        Nenhum Ativo ou Local encontrado! <br /> Limpe a pesquisa ou os filtros para ver os items disponíveis.
      </span>
    )
  }

  return (
    <Virtuoso style={{ height: '100%' }} totalCount={data.length} itemContent={(index) => <Node {...data[index]} />} />
  )
}
