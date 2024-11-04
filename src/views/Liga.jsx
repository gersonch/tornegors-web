import { useState } from 'react'
import CardInfoTournament from '../components/CardInfoTournament'
import TeamsTableBody from '../components/TeamsTableBody'

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
  const [error, setError] = useState('')

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }
  const handleAddTeam = (e) => {
    e.preventDefault()
    if (
      inputValue.trim() &&
      !teams.some((team) => team.nombre === inputValue.trim())
    ) {
      const newTeam = {
        nombre: inputValue.trim(),
        puntos: 0,
        difGoles: 0,
        difGolesIsPositive: true,
        golesEnContra: 0,
        golesAFavor: 0,
      }
      setTeams([...teams, newTeam])
      setInputValue('')
      setError('')
    } else {
      const mensajeError = 'El nombre del equipo debe ser único'
      setError(mensajeError)
    }
  }
  // Metodo filter devolvera los parametros de la funcion.
  //en este caso devuelve todos los elementos que no contengan el indice
  const handleEliminate = (index) => {
    setTeams(teams.filter((_, i) => i !== index))
  }
  return (
    <main className="lg:max-w-4xl lg:w-full mx-auto px-4 flex flex-col gap-4">
      <CardInfoTournament
        description={torneoLiga.descripcion}
        details={torneoLiga.formato.detalles}
        rules={torneoLiga.reglasDesempate.join(', ')}
      />
      <form className="mt-10">
        <input
          type="text"
          placeholder="Ingresa un equipo"
          onChange={handleChangeInput}
          value={inputValue}
          className="border-none bg-white text-black px-2 py-1"
          required
        />
        <button onClick={handleAddTeam} className="px-3 py-1 bg-slate-600">
          +
        </button>
        <span className="text-red-700 mx-4">{error}</span>
      </form>

      <div className="relative overflow-x-auto mb-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Equipo
              </th>
              <th scope="col" className="px-6 py-3">
                Pts.
              </th>
              <th scope="col" className="px-6 py-3">
                Dg.
              </th>
              <th scope="col" className="px-6 py-3">
                Gf.
              </th>
              <th scope="col" className="px-6 py-3">
                Gc.
              </th>
              <th scope="col" className="px-1 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <TeamsTableBody
                key={index}
                team={team}
                index={index}
                handleEliminate={handleEliminate}
              /> // Usar el nuevo componente aquí
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
