import { AiOutlineExclamationCircle, AiOutlineThunderbolt } from 'react-icons/ai'
import { Filter } from '../context/type'
import useUnitContext from '../hooks/useUnitContext'
import { cn } from '../utils/cn'
import Button from './Button'
import Search from './Search'
import ThreeView from './ThreeView'

export default function UnitContent() {
  const { activeUnit, activeFilter, handleActiveFilter, search, handleSearch, unitList } = useUnitContext()

  const isEnergySensorFilter = activeFilter === 'ENERGY_SENSOR'
  const isCriticalFilter = activeFilter === 'CRITICAL'

  return (
    <div className="flex flex-col gap-3 h-[95%] bg-white border rounded border-card px-4 py-[18px] overflow-hidden">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-950 text-xl font-semibold mr-2 inline">Ativos</h3>
          <span className="text-gray-600 text-sm font-normal align-text-top">/ {activeUnit.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isEnergySensorFilter ? 'primary' : 'secondary'}
            size="md"
            onClick={() => handleActiveFilter(Filter.ENERGY_SENSOR)}
          >
            <AiOutlineThunderbolt
              size={16}
              className={cn('text-blue-500', {
                'text-white': isEnergySensorFilter,
              })}
            />
            Sensor de Energia
          </Button>
          <Button
            variant={isCriticalFilter ? 'primary' : 'secondary'}
            size="md"
            onClick={() => handleActiveFilter(Filter.CRITICAL)}
          >
            <AiOutlineExclamationCircle
              size={16}
              className={cn('text-blue-500', {
                'text-white': isCriticalFilter,
              })}
            />
            Crítico
          </Button>
        </div>
      </header>
      <main className="flex-1 flex gap-2 overflow-hidden">
        <div className="flex-1 border rounded border-card overflow-auto">
          <Search value={search} handleSearch={handleSearch} />
          <div className="px-1 py-2 overflow-auto " style={{ maxHeight: 'calc(100% - 50px)' }}>
            <ThreeView data={unitList} />
          </div>
        </div>
      </main>
    </div>
  )
}
