import { useState } from 'react'
import { PlusIcon } from '../assets/icons/PlusIcon'
import CardsProfile from '../components/CardsProfile'
import tournaments from '../components/info/torneosProfile'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  // Función para obtener la clase de badge según el estado
  const getBadgeClass = (state) => {
    switch (state) {
      case 'En curso':
        return 'bg-green-200 text-green-700'
      case 'Finalizado':
        return 'bg-gray-200 text-gray-700'
      case 'No iniciado':
        return 'bg-yellow-200 text-yellow-700'
      default:
        return 'bg-blue-200 text-blue-700'
    }
  }

  // Redirigir a la página de crear torneo
  const handleRedirectLiga = () => {
    navigate('/profile/mis-torneos/play')
  }

  return (
    <section className="px-4 py-8 relative">
      <div>
        {tournaments.length === 0 ? (
          <p className="text-center text-xl text-white/85">
            No tienes torneos disponibles
          </p>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Mis torneos</h2>
            <ul className="flex flex-wrap justify-center gap-6">
              {tournaments.map((torneo, index) => (
                <li
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 p-4 flex justify-center"
                >
                  <div className="flex flex-col h-full w-full">
                    <CardsProfile
                      title={torneo.title}
                      description={torneo.description}
                      state={torneo.state}
                      style={`${getBadgeClass(torneo.state)} text-center`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-700 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 transition"
          onClick={handleRedirectLiga}
        >
          <PlusIcon /> <span>Crear Torneo</span>
        </button>
      </div>
    </section>
  )
}
