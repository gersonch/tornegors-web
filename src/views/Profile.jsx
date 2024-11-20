import { useState, useEffect, useContext } from 'react'
import { PlusIcon } from '../assets/icons/PlusIcon'
import CardsProfile from '../components/CardsProfile'
import tournaments from '../components/info/torneosProfile'
import CreateBoard from './CreateBoard'
import { UserContext } from '../context/UserContext'
import { SkeletonCard } from '../components/SkeletonCard'

export default function Profile() {
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useContext(UserContext)
  const URL = 'http://localhost:3000/api/user'

  useEffect(() => {
    if (token) {
      const getUserById = async () => {
        try {
          setIsLoading(true)
          const response = await fetch(`${URL}/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          })
          const data = await response.json()
          await new Promise((resolve) => setTimeout(resolve, 500))
          if (data) {
            setUserData(data)
          } else {
            console.error('No se pudo obtener el usuario')
          }
        } catch (err) {
          console.error('Error al obtener el usuario:', err)
        } finally {
          setIsLoading(false)
        }
      }
      getUserById()
    }
  }, [token])

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

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <section className="px-4 py-8 relative">
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <>
          <div className="max-w-5xl mx-auto">
            <p className="font-semibold text-xl mx-4">
              Hola, {userData.firstname}
            </p>
          </div>
          <div>
            {tournaments.length === 0 ? (
              <p className="text-center text-xl text-white/85">
                No tienes torneos disponibles
              </p>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Mis torneos
                </h2>
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
              onClick={handleShowModal}
            >
              <PlusIcon /> <span>Crear Torneo</span>
            </button>
          </div>
          {showModal && (
            <div className="relative">
              <CreateBoard handleClose={handleCloseModal} />
            </div>
          )}
        </>
      )}
    </section>
  )
}
