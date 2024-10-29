import { useState } from 'react'
import CardInfoTournament from '../components/CardInfoTournament'

export default function Liga() {
  const torneoLiga = {
    nombre: 'Formato Liga',
    descripcion:
      'En el formato de torneo tipo Liga, cada equipo compite contra los demás en varias jornadas, acumulando puntos a lo largo de la temporada.',
    formato: {
      estructura: 'round-robin',
      detalles:
        'Cada equipo juega al menos una vez contra cada rival, ya sea como local o visitante, en un número de jornadas determinado.',
      puntos: {
        victoria: 3,
        empate: 1,
        derrota: 0,
      },
      clasificacion:
        'Los equipos se ordenan en la tabla según el total de puntos obtenidos.',
    },
    reglasDesempate: [
      'Diferencia de goles',
      'Goles a favor',
      'Enfrentamientos directos',
    ],
    temporada: {
      duracion: 'Personalizable',
      inicio: 'Fecha inicial determinada por el organizador',
      fin: 'Fecha final determinada por el organizador',
    },
    ganador:
      'El equipo con más puntos al final del torneo es el campeón de la liga.',
    opcionesPersonalizacion: [
      'Cantidad de equipos',
      'Cantidad de jornadas',
      'Puntuación por partido',
    ],
  }
  const [inputValue, setInputValue] = useState('')
  const [teams, setTeams] = useState([])
  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }
  const handleAddTeam = (e) => {
    e.preventDefault() // Evita el refresco de la página al hacer clic en el botón
    if (inputValue.trim()) {
      setTeams([...teams, inputValue]) // Agrega un nuevo equipo al array
      setInputValue('') // Limpia el input después de agregar el equipo
    }
  }

  return (
    <main>
      <CardInfoTournament
        description={torneoLiga.descripcion}
        details={torneoLiga.formato.detalles}
        rules={torneoLiga.reglasDesempate.join(', ')}
      />
      <form>
        <input
          type="text"
          placeholder="ingresa un equipo"
          onChange={handleChangeInput}
          value={inputValue}
          required
        />
        <button onClick={handleAddTeam} className="bg-slate-600 px-6 py-4">
          +
        </button>
      </form>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </main>
  )
}
