import { AiOutlineSearch } from 'react-icons/ai'
import Button from './Button'

interface SearchProps {
  value: string
  handleSearch: (value: string) => void
}

export default function Search({ handleSearch, value }: SearchProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    handleSearch(value)
  }

  return (
    <div className="flex pe-3 border-b  border-card">
      <input
        value={value}
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="w-full h-11 px-3 focus-visible:outline-none"
        onChange={onChange}
      />
      <Button variant="icon">
        <AiOutlineSearch size={20} />
      </Button>
    </div>
  )
}
