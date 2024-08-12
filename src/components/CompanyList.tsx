import { AiOutlineGold } from 'react-icons/ai'
import useUnitContext from '../hooks/useCompanyContext'
import { cn } from '../utils/cn'
import Button from './Button'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getCompanies } from '../service/api'
import { useEffect } from 'react'

export default function CompanyList() {
  const { handleActiveCompany, activeCompany } = useUnitContext()

  const { data = [] } = useSuspenseQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies(),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      handleActiveCompany(data[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) return null

  return (
    <div className="flex items-center gap-[10px]">
      {data?.map((company) => (
        <Button
          key={company.id}
          className={cn('', {
            'bg-blue-900': activeCompany?.id !== company.id,
          })}
          onClick={() => handleActiveCompany(company)}
        >
          <AiOutlineGold size={14} />
          {company?.name}
        </Button>
      ))}
    </div>
  )
}
