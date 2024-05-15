import { AiOutlineExclamationCircle, AiOutlineThunderbolt } from 'react-icons/ai'
import { Filter } from '../context/type'
import useUnitContext from '../hooks/useUnitContext'
import { cn } from '../utils/cn'
import Button from './Button'
import ComponentData from './ComponentData'
import Search from './Search'
import TreeView from './TreeView'

export default function UnitContent() {
  const {
    activeUnit,
    activeFilter,
    handleActiveFilter,
    search,
    handleSearch,
    unitList,
    handleActiveAsset,
    activeAsset,
  } = useUnitContext()

  const isEnergySensorFilter = activeFilter === 'ENERGY_SENSOR'
  const isCriticalFilter = activeFilter === 'CRITICAL'

  const hasData = !!unitList.data.length

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
        <section className="flex-1 border rounded border-card ">
          <Search value={search} handleSearch={handleSearch} />
          {unitList.isLoading ? (
            <span className="text-gray-600 text-sm block text-center mt-4">Carregando...</span>
          ) : hasData ? (
            <TreeView
              data={unitList.data}
              onClickAsset={(nextAsset) => handleActiveAsset(nextAsset)}
              activeAsset={activeAsset}
            />
          ) : (
            <span className="text-gray-600 text-sm block text-center mt-4">
              Nenhum Ativo ou Local encontrado! <br /> Limpe a pesquisa ou os filtros para ver os items disponíveis.
            </span>
          )}
        </section>
        <ComponentData />
      </main>
    </div>
  )
}
