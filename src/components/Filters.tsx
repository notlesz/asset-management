import { AiOutlineExclamationCircle, AiOutlineThunderbolt } from 'react-icons/ai'
import { Filter } from '../context/type'
import useUnitContext from '../hooks/useCompanyContext'
import Button from './ui/Button'
import { cn } from '../utils/cn'

export default function Filters() {
  const { activeFilter, handleActiveFilter } = useUnitContext()

  const isEnergySensorFilter = activeFilter === 'ENERGY_SENSOR'
  const isCriticalFilter = activeFilter === 'CRITICAL'
  return (
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
  )
}
