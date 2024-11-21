/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { TournamentContext } from '../context/TournamentContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function LigaPlayLiga() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isAddingTeamComplete, setIsAddingTeamComplete] = useState(false)
  const [fixture, setFixture] = useState([])
  const [scores, setScores] = useState({})
  const { tournament, getTournamentById } = useContext(TournamentContext)
  const { id } = useParams()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      getTournamentById(id)
    }
  }, [id])

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
        partidosJugados: 0,
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

  const generateFixture = (teams) => {
    const teamsNumber = teams.length
    const isImpar = teamsNumber % 2 !== 0

    if (isImpar) teams.push({ nombre: 'bye' })

    const fixture = []
    const numRound = teams.length - 1
    for (let round = 0; round < numRound; round++) {
      const days = []
      for (let i = 0; i < teams.length / 2; i++) {
        const localTeam = teams[i]
        const visiteTeam = teams[teams.length - 1 - i]
        if (localTeam.nombre !== 'bye' && visiteTeam.nombre !== 'bye') {
          days.push({ local: localTeam, visite: visiteTeam })
        }
      }
      fixture.push(days)
      teams.splice(1, 0, teams.pop())
    }
    return fixture
  }

  const handleStart = () => {
    const generatedFixture = generateFixture([...teams])
    setFixture(generatedFixture)
    console.log(teams)
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
    const updatedTeams = teams.map((team) => ({
      ...team,
      puntos: 0,
      difGoles: 0,
      golesAFavor: 0,
      golesEnContra: 0,
      partidosJugados: 0,
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

    setTeams(updatedTeams)
  }

  return (
    <main className="">
      <h2 className="max-w-5xl mx-auto font-bold my-8 text-3xl">
        {tournament?.title || 'cargando...'}
      </h2>
      {!isAddingTeamComplete && (
        <form className="max-w-5xl mx-auto mb-4">
          <input
            type="text"
            placeholder="Ingresa un equipo"
            onChange={handleChangeInput}
            value={inputValue}
            className="border bg-[#2e2e3e] text-[#ffffff] px-2 py-1 rounded-lg"
          />
          <button
            onClick={handleAddTeam}
            className="ml-2 px-3 py-1 bg-[#4e4e6e] text-[#ffffff] hover:bg-[#6e6e8e] rounded-lg"
          >
            Agregar equipo
          </button>
          <span className="text-[#ff6e6e] ml-4">{error}</span>
        </form>
      )}

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm max-w-5xl mx-auto text-left rtl:text-right  text-gray-400">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-0.5 text-center">
                Pos.
              </th>
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
              {!isAddingTeamComplete && (
                <th scope="col" className="px-6 py-3">
                  Eliminar
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {teams
              .slice() // Creamos una copia para no mutar el estado original
              .sort((a, b) => {
                if (b.puntos === a.puntos) {
                  return b.difGoles - a.difGoles // Ordenar por diferencia de goles si los puntos son iguales
                }
                return b.puntos - a.puntos // Ordenar por puntos
              })
              .map((team, index) => (
                <tr
                  key={index}
                  className="border-b bg-gray-800 border-gray-700"
                >
                  <td className="px-1 py-0.5 text-center">{index + 1}</td>
                  <td className="px-6 py-4">{team.nombre}</td>
                  <td className="px-6 py-4">{team.puntos}</td>
                  <td className="px-6 py-4">{team.difGoles}</td>
                  <td className="px-6 py-4">{team.golesAFavor}</td>
                  <td className="px-6 py-4">{team.golesEnContra}</td>
                  {!isAddingTeamComplete && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEliminate(index)}
                        className="text-[#ff6e6e] hover:text-[#ff4e4e]"
                      >
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-5xl mx-auto">
        {!isAddingTeamComplete && (
          <button
            onClick={handleEndAddTeams}
            className="mt-4 bg-[#6e6e8e] px-3 py-1 text-[#ffffff] rounded-lg hover:bg-[#8e8eae]"
          >
            ¡Estamos Listos!
          </button>
        )}
        {isAddingTeamComplete && (
          <>
            <button
              onClick={handleStart}
              className="mt-4 bg-[#5e5e7e] px-3 py-1 text-[#ffffff] rounded-lg hover:bg-[#7e7e9e]"
            >
              Generar Fixture
            </button>
            <button
              onClick={updateTableWithScores}
              className="ml-2 bg-[#4e4e6e] px-3 py-1 text-[#ffffff] rounded-lg hover:bg-[#6e6e8e]"
            >
              Actualizar Tabla
            </button>
          </>
        )}
        <div className=" mt-4 ">
          {fixture.map((round, roundIndex) => (
            <div
              key={roundIndex}
              className="mt-6 bg-slate-700 py-4 px-6 rounded-md"
            >
              <h3 className="text-[#e2e2e2] mb-4">Jornada {roundIndex + 1}</h3>
              {round.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="flex items-center justify-between my-3  p-3 rounded-lg "
                >
                  <span className="text-[#ffffff] flex-1 text-center">
                    {match.local.nombre}
                  </span>
                  <div className="flex items-center space-x-2 flex-1 justify-center">
                    <input
                      type="number"
                      onChange={(e) =>
                        handleScoreChange(
                          roundIndex,
                          matchIndex,
                          'local',
                          e.target.value
                        )
                      }
                      className="border bg-[#3e3e4e] text-[#ffffff] px-2 py-1 w-12 rounded-lg"
                    />
                    <span className="text-[#ffffff]">-</span>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleScoreChange(
                          roundIndex,
                          matchIndex,
                          'visite',
                          e.target.value
                        )
                      }
                      className="border bg-[#3e3e4e] text-[#ffffff] px-2 py-1 w-12 rounded-lg text-center"
                    />
                  </div>
                  <span className="text-[#ffffff] flex-1 text-center">
                    {match.visite.nombre}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
