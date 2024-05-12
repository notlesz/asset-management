import Header from './components/Header'
import UnitContent from './components/UnitContent'
import UnitContextProvider from './context/UnitContext'

function App() {
  return (
    <main className="h-screen bg-gray-400  overflow-hidden">
      <UnitContextProvider>
        <Header />
        <section className="h-full p-2  overflow-hidden">
          <UnitContent />
        </section>
      </UnitContextProvider>
    </main>
  )
}

export default App
