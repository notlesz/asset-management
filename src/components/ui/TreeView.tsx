/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react'
import { Virtuoso } from 'react-virtuoso'

export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
  [key: string]: any
}

interface TreeViewProps<T extends TreeItem> {
  items: T[]
  expandedItems: Set<string>
  onItemSelect?: (item: T) => void
  renderItem: (item: T, isExpanded: boolean, isSelected: boolean) => React.ReactNode
}

function TreeView<T extends TreeItem>({ items, expandedItems, onItemSelect, renderItem }: TreeViewProps<T>) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleItemSelect = useCallback(
    (item: T) => {
      setSelectedItemId(item.id)
      if (onItemSelect) {
        onItemSelect(item)
      }
    },
    [onItemSelect]
  )

  const renderTreeItem = (item: T, level: number) => {
    const isExpanded = expandedItems.has(item.id)
    const isSelected = selectedItemId === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <div onClick={() => handleItemSelect(item)}>{renderItem(item, isExpanded, isSelected)}</div>
        {hasChildren && isExpanded && item.children!.map((child) => renderTreeItem(child as T, level + 1))}
      </div>
    )
  }

  return (
    <Virtuoso
      style={{ height: '100%' }}
      totalCount={items.length}
      itemContent={(index) => renderTreeItem(items[index], 0)}
    />
  )
}

export default TreeView
