/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Boards() {
  const { token, logout } = useContext(UserContext)
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const navigate = useNavigate()

  // Función para obtener los tableros
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
        throw new Error('Error al obtener los tableros del usuario')
      }

      const boardData = await response.json()
      setData(boardData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchBoard()
  }, [token, navigate])

  // Función para crear un nuevo tablero
  async function handleCreateBoard(e) {
    e.preventDefault()
    try {
      const response = await fetch(
        'http://localhost:3000/api/boards/create-board',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newBoardTitle,
            description: 'Descripción del tablero',
            is_active: 'activo',
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Hubo un error al crear el tablero')
      }

      const { data: newBoard } = await response.json()

      setData((prevData) => [...prevData, newBoard]) // Agregar el nuevo tablero al estado
      setShowModal(false) // Cerrar el modal
      setNewBoardTitle('') // Limpiar el campo de título
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section>
      <h1>Boards</h1>
      <section>
        {data.length === 0 ? (
          <p>No hay tableros disponibles</p>
        ) : (
          <ul>
            {data.map((board) => (
              <li key={board.id}>{board.title}</li>
            ))}
          </ul>
        )}
      </section>
      <button onClick={() => setShowModal(true)}>Crear un nuevo tablero</button>
      <button onClick={logout}>Logout</button>

      {/* Modal para crear un nuevo tablero */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Crear Tablero</h2>
            <form onSubmit={handleCreateBoard}>
              <label>
                Título del tablero:
                <input
                  type="text"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  required
                />
              </label>

              <div className="modal-buttons">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
