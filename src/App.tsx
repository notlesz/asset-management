import { Suspense } from 'react'
import Header from './components/Header'
import UnitContent from './components/CompanyContent'

import Loading from './components/Loading'

const FallBackLoading = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Loading />
  </div>
)

function App() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <main className="h-screen w-full flex flex-col">
        <Header />
        <section className="flex-1 p-2 h-full">
          <UnitContent />
        </section>
      </main>
    </Suspense>
  )
}

export default App
