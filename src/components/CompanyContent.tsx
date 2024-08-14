import useUnitContext from '../hooks/useCompanyContext'
import ComponentData from './ComponentData'
import Search from './Search'
import useCompanyTree from '../hooks/useCompanyTree'
import Filters from './Filters'
import CompanyTreeView from './CompanyTreeView'

export default function CompanyContent() {
  const { activeCompany, activeFilter, search, activeAsset, handleSearch, handleActiveAsset } = useUnitContext()

  const { companyNodes, companyRoot, isLoading } = useCompanyTree({ activeCompany, activeFilter, search })

  const hasData = !!companyRoot.length

  return (
    <div className="flex flex-col gap-3 h-full bg-white border rounded border-card px-4 py-[18px] overflow-hidden">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-950 text-xl font-semibold mr-2 inline">Ativos</h3>
          <span className="text-gray-600 text-sm font-normal align-text-top">/ {activeCompany?.name}</span>
        </div>
        <Filters />
      </header>
      <main className="flex-1 flex gap-2 overflow-hidden">
        <section className="flex flex-1 flex-col border rounded border-card ">
          <Search value={search} handleSearch={handleSearch} />
          <div className="h-full">
            {isLoading ? (
              <span className="text-gray-600 text-sm block text-center mt-4">Carregando...</span>
            ) : hasData ? (
              <CompanyTreeView
                search={search}
                activeFilter={activeFilter}
                nodes={companyNodes}
                data={companyRoot}
                onClickAsset={handleActiveAsset}
                activeAsset={activeAsset}
              />
            ) : (
              <span className="text-gray-600 text-sm block text-center mt-4">
                Nenhum Ativo ou Local encontrado! <br /> Limpe a pesquisa ou os filtros para ver os items disponíveis.
              </span>
            )}
          </div>
        </section>
        <ComponentData />
      </main>
    </div>
  )
}
