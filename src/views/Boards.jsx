import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Boards() {
  const { token, logout } = useContext(UserContext)
  const [data, setData] = useState([]) // Se debe usar useState para el estado de data
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchBoard = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/boards/get-board',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          // Corregido para verificar que la respuesta sea válida
          throw new Error('Error al obtener los tableros del usuario')
        }

        const boardData = await response.json()
        setData(boardData) // Establecer los tableros en el estado
      } catch (err) {
        console.error(err)
      }
    }

    fetchBoard()
  }, [token, navigate]) // Corregido para no incluir setData en las dependencias

  return (
    <section>
      <h1>Boards</h1>
      <section>
        {data.length === 0 ? (
          <p>No hay tableros disponibles</p> // Mensaje si no hay tableros
        ) : (
          <ul>
            {data.map((board) => (
              <li key={board.id}>{board.title}</li> // Suponiendo que board tenga una propiedad title
            ))}
          </ul>
        )}
      </section>
      <button onClick={logout}>Logout</button>
    </section>
  )
}
