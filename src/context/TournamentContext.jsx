/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const TournamentContext = createContext()

export const TournamentProvider = ({ children }) => {
  const URL = 'http://localhost:3000/api/tournament'
  const [tournaments, setTournaments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tournament, setTournament] = useState({})

  const getTournamentsByUser = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${URL}/get-tournament`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      })

      const data = await response.json()
      if (response.ok) {
        setTournaments(data)
      } else {
        setError(data.message || 'Error al cargar torneos')
      }
    } catch (err) {
      setError('Hubo un error al obtener los torneos', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getTournamentById = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${URL}/get-tournament/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      })
      const data = await response.json()
      if (response.ok) {
        setTournament(data)
      } else {
        setError(data.message || 'Error al cargar el torneo')
      }
    } catch (err) {
      setError('Hubo un error al obtener los torneos', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        tournament,
        isLoading,
        error,
        getTournamentsByUser,
        getTournamentById,
      }}
    >
      {children}
    </TournamentContext.Provider>
  )
}
