//import { useState } from 'react'
//import CloseIcon from '../assets/icons/CloseIcon'
import LigaPlayLiga from './Liga'

export default function Home() {
  //const [isOpen, setIsOpen] = useState(true)
  // const handleCloseAlert = () => {
  //   if (isOpen) {
  //     setIsOpen(false)
  //     return
  //   }
  // }

  return (
    <>
      <section className="mx-8 my-8">
        <div className="collapse bg-slate-700/70 max-w-4xl mx-auto my-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium text-red-500">
            ¡Ojo!
          </div>
          <div className="collapse-content text-red-500">
            <p>
              Te recomendamos que inicies sesión para que se guarde tu torneo y
              puedas acceder a el cuando quieras
            </p>
          </div>
        </div>

        <LigaPlayLiga />
      </section>
    </>
  )
}
