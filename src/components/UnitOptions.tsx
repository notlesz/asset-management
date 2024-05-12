import { AiOutlineGold } from 'react-icons/ai'
import useUnitContext from '../hooks/useUnitContext'
import { cn } from '../utils/cn'
import Button from './Button'

export default function UnitOptions() {
  const { activeUnit, availableUnits, handleActiveUnit } = useUnitContext()

  return (
    <div className="flex items-center gap-[10px]">
      {availableUnits.map((unit) => (
        <Button
          key={unit.name}
          className={cn('', {
            'bg-blue-900': activeUnit.value !== unit.value,
          })}
          onClick={() => handleActiveUnit(unit)}
        >
          <AiOutlineGold size={14} />
          {unit.name}
        </Button>
      ))}
    </div>
  )
}
