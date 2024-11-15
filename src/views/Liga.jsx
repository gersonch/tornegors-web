import { useState } from 'react'

import TeamsTableBody from '../components/TeamsTableBody'

export default function Liga() {
  const [inputValue, setInputValue] = useState('')
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isAddingTeamComplete, setIsAddingTeamComplete] = useState(false)

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleAddTeam = (e) => {
    e.preventDefault()
    if (isAddingTeamComplete) {
      setError('No se pueden agregar más equipos')
      return
    }

    if (teams.length >= 32) {
      setError('El número máximo de equipos es 32.')
      return
    }

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
      setError('El nombre del equipo debe ser único.')
    }
  }

  const handleEliminate = (index) => {
    if (isAddingTeamComplete) {
      return
    }
    setTeams(teams.filter((_, i) => i !== index))
  }

  const handleEndAddTeams = () => {
    if (teams.length < 4) {
      setError('Debe haber al menos 4 equipos para iniciar el torneo.')
      return
    }
    setIsAddingTeamComplete(true)
  }

  return (
    <main className="lg:max-w-4xl lg:w-full mx-auto px-8 py-4 flex flex-col gap-4 rounded-md modal">
      {/* <CardInfoTournament
        description={torneoLiga.descripcion}
        details={torneoLiga.formato.detalles}
        rules={torneoLiga.reglasDesempate.join(', ')}
      /> */}
      <form className={`mt-10`}>
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
        <span className="text-red-600 mx-4">{error}</span>
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
              />
            ))}
          </tbody>
        </table>
        <button
          className="btn px-3 py-1 bg-green-500 hover:bg-green-400 transition mt-4"
          onClick={handleEndAddTeams}
        >
          ¡Estamos Listos!
        </button>
      </div>
    </main>
  )
}
