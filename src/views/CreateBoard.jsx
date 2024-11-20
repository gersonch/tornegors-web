/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CloseIcon from '../assets/icons/CloseIcon'

export default function CreateBoard({ handleClose }) {
  const [boardTitle, setBoardTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Función para manejar la creación del tablero
  const handleCreateBoard = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(
        'http://localhost:3000/api/tournament/create-tournament',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: boardTitle,
            description: description,
            type: type,
          }),
          credentials: 'include',
        }
      )

      if (!response.ok) {
        const errorData = await response.json() // Obtiene el cuerpo de la respuesta de error
        console.error('Error:', errorData) // Imprime el error recibido
        throw new Error('Error al crear el torneo')
      }
      navigate('/profile/mis-torneos/play')
      console.log(type)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
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
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="" selected>
                ¿Que tipo de torneo quieres crear?
              </option>
              <option value="liga">Liga</option>
              <option value="playoff">Play-off</option>
            </select>
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
                className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 flex items-center"
                disabled={isLoading} // Deshabilitar si está cargando
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  'Crear'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
