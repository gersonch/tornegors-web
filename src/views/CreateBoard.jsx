/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CloseIcon from '../assets/icons/CloseIcon'

export default function CreateBoard({ handleClose }) {
  const [boardTitle, setBoardTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  // Función para manejar la creación del tablero
  const handleCreateBoard = (e) => {
    e.preventDefault()
    console.log('Título del tablero:', boardTitle)
    console.log('Descripción:', description)

    // Limpiar campos
    setBoardTitle('')
    setDescription('')

    // Opcional: Redirigir después de crear el tablero
    navigate('/profile/mis-torneos/play')
  }

  return (
    <section className="relative">
      {/* Fondo oscuro detrás del modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        {/* Contenido del modal en modo oscuro */}
        <button
          className="text-white absolute top-36 right-96"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg w-96 p-6 z-50">
          <h2 className="text-xl font-bold mb-4 text-center">Crear Torneo</h2>
          <form onSubmit={handleCreateBoard} className="space-y-4">
            <label className="block">
              <span className="block font-medium">Título del Torneo:</span>
              <input
                type="text"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-100"
              />
            </label>
            <label className="block">
              <span className="block font-medium">Descripción:</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-100"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose} // Opcional: botón para cancelar
                className="px-4 py-2 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
