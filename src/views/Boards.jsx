import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Boards() {
  const [boardTitle, setBoardTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  // Función para manejar la creación del tablero
  const handleCreateBoard = (e) => {
    e.preventDefault()
    console.log('Título del tablero:', boardTitle)
    console.log('Descripción:', description)

    // Aquí puedes agregar lógica para enviar datos al backend
    // Ejemplo:
    // await fetch('/api/boards', {
    //   method: 'POST',
    //   body: JSON.stringify({ title: boardTitle, description }),
    // });

    // Limpiar campos
    setBoardTitle('')
    setDescription('')

    // Opcional: Redirigir después de crear el tablero
    navigate('/profile/mis-torneos/play')
  }

  return (
    <section>
      <h1>Boards</h1>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Crear Tablero</h2>
          <form onSubmit={handleCreateBoard}>
            <label>
              Título del tablero:
              <input
                type="text"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Descripción:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <div className="modal-buttons">
              <button type="submit">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
