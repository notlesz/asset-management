import { MdOutlineRouter, MdWifiTethering } from 'react-icons/md'
import useUnitContext from '../hooks/useCompanyContext'
import { cn } from '../utils/cn'
import ImageGear from '/assets/image-gear.png'

export default function ComponentData() {
  const { activeAsset } = useUnitContext()
  return (
    <section
      className={cn('flex-[2] border rounded border-card', {
        invisible: !activeAsset,
      })}
    >
      <header className="px-4 py-3 border-b border-card">
        <h3 className="text-gray-950 font-semibold text-lg uppercase">{activeAsset?.name}</h3>
      </header>
      <main className="p-6 flex flex-col gap-6">
        <section className="flex items-center gap-6">
          <img src={ImageGear} alt="Image Gear" />
          <div className="flex flex-col w-full">
            <div className="py-6">
              <h4 className="text-gray-950 font-semibold text-base mb-2">Tipo de Equipamento</h4>
              <span className="font-normal text-gray-500">Motor Elétrico (Trifásico)</span>
            </div>
            <div className="py-6 border-t border-card flex-1">
              <h4 className="text-gray-950 font-semibold text-base mb-2">Responsáveis</h4>
              <div className="flex gap-2 items-center">
                <span className="w-6 h-6 border rounded-full flex items-center justify-center bg-blue-500 text-xs text-white">
                  E
                </span>
                <span className="font-normal text-gray-500">Elétrica</span>
              </div>
            </div>
          </div>
        </section>
        <section className="flex border-t border-card py-4">
          <div className="flex-1">
            <h4 className="text-gray-950 font-semibold text-base mb-2">Sensor</h4>
            <div className="flex gap-2 items-center">
              <MdWifiTethering size={20} className="text-blue-500" />
              <span className="font-normal text-gray-500">HIO4510</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-950 font-semibold text-base mb-2">Receptor</h4>
            <div className="flex gap-2 items-center">
              <MdOutlineRouter size={20} className="text-blue-500" />
              <span className="font-normal text-gray-500">EUH4R27</span>
            </div>
          </div>
        </section>
      </main>
    </section>
  )
}
