import { equiposProvisorios } from '../components/info/EquipoProv'
import { useState } from 'react'

export default function PlayLiga() {
  const [fixture, setFixture] = useState([])
  const [scores, setScores] = useState({})
  const [teamsData, setTeamsData] = useState([...equiposProvisorios])

  const ordenatedTeams = [...teamsData].sort((a, b) => b.puntos - a.puntos)

  function generateFixture(teams) {
    const teamsNumber = teams.length
    const isImpar = teamsNumber % 2 !== 0

    if (isImpar) teams.push('bye')

    const fixture = []
    const numRound = teams.length - 1
    for (let round = 0; round < numRound; round++) {
      const days = []
      for (let i = 0; i < teams.length / 2; i++) {
        const localTeam = teams[i]
        const visiteTeam = teams[teams.length - 1 - i]
        if (localTeam !== 'bye' && visiteTeam !== 'bye') {
          days.push({ local: localTeam, visite: visiteTeam })
        }
      }
      fixture.push(days)
      teams.splice(1, 0, teams.pop())
    }
    return fixture
  }

  const handleStart = () => {
    const generatedFixture = generateFixture(ordenatedTeams)
    setFixture(generatedFixture)
  }

  const handleScoreChange = (round, matchIndex, team, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [round]: {
        ...prevScores[round],
        [matchIndex]: {
          ...prevScores[round]?.[matchIndex],
          [team]: value,
        },
      },
    }))
  }

  const updateTableWithScores = () => {
    const updatedTeams = teamsData.map((team) => ({
      ...team,
      puntos: 0,
      difGoles: 0,
      golesAFavor: 0,
      golesEnContra: 0,
      partidosJugados: 0, // Nueva propiedad para los partidos jugados
    }))

    Object.keys(scores).forEach((round) => {
      Object.keys(scores[round]).forEach((matchIndex) => {
        const match = scores[round][matchIndex]
        const localTeam = fixture[round][matchIndex].local
        const visiteTeam = fixture[round][matchIndex].visite

        const localGoals = parseInt(match.local || 0, 10)
        const visiteGoals = parseInt(match.visite || 0, 10)

        const localTeamData = updatedTeams.find(
          (team) => team.nombre === localTeam.nombre
        )
        const visiteTeamData = updatedTeams.find(
          (team) => team.nombre === visiteTeam.nombre
        )

        if (localTeamData && visiteTeamData) {
          localTeamData.golesAFavor += localGoals
          localTeamData.golesEnContra += visiteGoals
          visiteTeamData.golesAFavor += visiteGoals
          visiteTeamData.golesEnContra += localGoals

          localTeamData.difGoles += localGoals - visiteGoals
          visiteTeamData.difGoles += visiteGoals - localGoals

          // Incrementar partidos jugados solo si se han anotado goles
          if (localGoals > 0 || visiteGoals > 0) {
            localTeamData.partidosJugados += 1
            visiteTeamData.partidosJugados += 1
          }

          if (localGoals > visiteGoals) {
            localTeamData.puntos += 3
          } else if (localGoals < visiteGoals) {
            visiteTeamData.puntos += 3
          } else {
            localTeamData.puntos += 1
            visiteTeamData.puntos += 1
          }
        }
      })
    })

    setTeamsData(updatedTeams)
  }

  return (
    <div className="p-4 max-w-5xl mx-auto w-full overflow-auto">
      <h2 className="text-xl font-bold text-white mb-4">Equipos</h2>
      <table className="max-w-5xl w-full mx-auto bg-gray-800 text-white border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-2 px-4 border-b border-gray-600 text-left">
              Equipo
            </th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">
              P.J
            </th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">
              Pts.
            </th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">
              D.G
            </th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">
              G.F
            </th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">
              G.C
            </th>
          </tr>
        </thead>
        <tbody>
          {ordenatedTeams.map((equipo, index) => (
            <tr key={index} className="hover:bg-gray-600">
              <td className="py-2 px-4 border-b border-gray-600">
                {equipo.nombre}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                {equipo.partidosJugados || 0}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                {equipo.puntos}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                {equipo.difGoles}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                {equipo.golesAFavor}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                {equipo.golesEnContra}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleStart}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Empezar
      </button>
      <button
        onClick={updateTableWithScores}
        className="mt-4 ml-2 p-2 bg-green-500 text-white rounded"
      >
        Actualizar Tabla
      </button>

      <div>
        <h2 className="text-lg font-bold mt-4 text-white">Fixture</h2>
        {fixture.map((round, roundIndex) => (
          <div
            key={roundIndex}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-md my-4 w-full max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold mb-2">
              Jornada {roundIndex + 1}
            </h3>
            {round.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="flex items-center justify-between space-x-2 my-2"
              >
                <span className="flex-1 text-right">{match.local.nombre}</span>
                <input
                  type="number"
                  min="0"
                  className="w-16 p-1 text-center border border-gray-400 rounded"
                  value={scores[roundIndex]?.[matchIndex]?.local || ''}
                  onChange={(e) =>
                    handleScoreChange(
                      roundIndex,
                      matchIndex,
                      'local',
                      e.target.value
                    )
                  }
                  placeholder="Goles"
                />
                <span>vs</span>
                <input
                  type="number"
                  min="0"
                  className="w-16 p-1 text-center border border-gray-400 rounded"
                  value={scores[roundIndex]?.[matchIndex]?.visite || ''}
                  onChange={(e) =>
                    handleScoreChange(
                      roundIndex,
                      matchIndex,
                      'visite',
                      e.target.value
                    )
                  }
                  placeholder="Goles"
                />
                <span className="flex-1 text-left">{match.visite.nombre}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
