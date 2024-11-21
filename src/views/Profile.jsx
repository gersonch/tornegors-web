/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'
import { PlusIcon } from '../assets/icons/PlusIcon'
import CardsProfile from '../components/CardsProfile'
import CreateBoard from './CreateBoard'
import { UserContext } from '../context/UserContext'
import { SkeletonCard } from '../components/SkeletonCard'
import { TournamentContext } from '../context/TournamentContext'
import 'flag-icons/css/flag-icons.min.css'
import { ShowFlagIcon } from '../assets/icons/FlagIcons'

export default function Profile() {
  const [showModal, setShowModal] = useState(false)
  const {
    token,
    isLoading,
    getUserById,
    userData,
    error: userError,
  } = useContext(UserContext)
  const {
    getTournamentsByUser,
    tournaments,
    error: tournamentError,
  } = useContext(TournamentContext)

  const getBadgeClass = (state) => {
    switch (state) {
      case 'liga':
        return 'bg-green-200 text-green-700'
      case 'playoff':
        return 'bg-gray-200 text-gray-700'
      default:
        return 'bg-blue-200 text-blue-700'
    }
  }
  useEffect(() => {
    if (token) {
      getTournamentsByUser()
      getUserById()
    }
  }, [token])

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <section className="px-4 py-8 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">Mis torneos</h2>
      <div className="max-w-5xl mx-auto">
        <p className="font-semibold text-xl mx-4">
          Hola, {userData?.firstname}
          <i className={`${ShowFlagIcon(userData?.nationality)} ml-2`}></i>
        </p>
      </div>

      {isLoading ? (
        <SkeletonCard />
      ) : userError || tournamentError ? (
        <div className="text-center text-red-600">
          <p>Hubo un error al cargar los datos.</p>
          <p>{userError || tournamentError}</p>
        </div>
      ) : (
        <>
          <div>
            {tournaments.length === 0 ? (
              <p className="text-center text-xl text-white/85">
                No tienes torneos disponibles
              </p>
            ) : (
              <>
                <ul className="flex flex-wrap justify-center gap-6">
                  {tournaments.map((torneo, index) => (
                    <li
                      key={index}
                      className="w-full sm:w-1/2 lg:w-1/3 p-4 flex justify-center"
                    >
                      <div className="flex flex-col h-full w-full">
                        <CardsProfile
                          id={torneo.id}
                          title={torneo.title}
                          description={torneo.description}
                          type={torneo.type}
                          style={`${getBadgeClass(torneo.type)}`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )}
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
    </section>
  )
}
