import { useState } from 'react'
import CloseIcon from '../assets/icons/CloseIcon'
import LigaPlayLiga from './Liga'

export default function Home() {
  const [isOpen, setIsOpen] = useState(true)
  const handleCloseAlert = () => {
    if (isOpen) {
      setIsOpen(false)
      return
    }
  }

  return (
    <>
      <section className="mx-8 my-8">
        {isOpen && (
          <div
            className="p-4 mb-4 text-sm  bg-gray-800 text-red-400 max-w-5xl mx-auto rounded-lg  flex gap-1"
            role="alert"
          >
            <span className="font-medium">¡Ojo! </span>
            Te recomendamos que crees tu cuenta para que puedas guardar tus
            torneos y los puedas abrir cuando quieras.
            <button className=" ml-10 lg:ml-40" onClick={handleCloseAlert}>
              <CloseIcon />
            </button>
          </div>
        )}

        <LigaPlayLiga />
      </section>
    </>
  )
}
