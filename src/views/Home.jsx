//import { useState } from 'react'
//import CloseIcon from '../assets/icons/CloseIcon'

import PlayLiga from './PlayLiga'

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
          <div className="collapse-content text-red-300">
            <p>
              Te recomendamos que inicies sesión para que se guarde tu torneo y
              puedas acceder a el cuando quieras. <br></br> <br></br>Lamentamos
              los inconvenientes. Esta página aún se encuentra{' '}
              <span className="font-bold text-red-400">en desarrollo</span>, por
              lo que algunas funcionalidades todavía{' '}
              <span className="font-bold text-red-400">
                no están disponibles
              </span>
              . Agradecemos tu comprensión.
            </p>
          </div>
        </div>

        <PlayLiga />
      </section>
    </>
  )
}
