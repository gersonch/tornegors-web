import PropTypes from 'prop-types'
import TrashBinIcon from '../assets/icons/TrashBinIcon'

TeamsTableBody.propTypes = {
  team: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    puntos: PropTypes.number.isRequired,
    difGoles: PropTypes.number.isRequired,
    difGolesIsPositive: PropTypes.bool.isRequired,
    golesAFavor: PropTypes.number.isRequired,
    golesEnContra: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleEliminate: PropTypes.func,
}

export default function TeamsTableBody({ team, index, handleEliminate }) {
  return (
    <tr
      key={`${team.nombre}-${index}`} // Usar el nombre y el índice como clave única
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {team.nombre}
      </th>
      <td className="px-6 py-4">{team.puntos}</td>
      <td className="px-6 py-4">
        {team.difGolesIsPositive ? '+' : '-'} {team.difGoles}
      </td>
      <td className="px-6 py-4">{team.golesAFavor}</td>
      <td className="px-6 py-4">{team.golesEnContra}</td>
      <td>
        <button className="text-red-600" onClick={() => handleEliminate(index)}>
          <TrashBinIcon />
        </button>
      </td>
    </tr>
  )
}
