/* eslint-disable react/prop-types */

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

CardsProfile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: PropTypes.string.isRequired,
  // Se asegura de que `className` siempre esté presente
}

function CardsProfile({
  title,
  description,
  type,
  style,
  id,
  eliminateTournament,
}) {
  return (
    <>
      <Link
        to={`mis-torneos/${id}`}
        className=" bg-cyan-950 px-8 py-4 rounded-xl flex flex-col gap-4 md:min-h-44 md:44"
      >
        <h5 className=" text-xl font-bold">{title}</h5>
        <p className=" text-white/70">{description}</p>
        <span
          className={`text-sm font-medium px-1 py-0.5 rounded max-w-28 flex-nowrap flex text-center justify-center ${style} `}
        >
          {type}
        </span>
        <div className="flex justify-end gap-4">
          <button
            className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 max-w-28 text-center flex items-center justify-center"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              eliminateTournament(id)
            }}
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </Link>
    </>
  )
}

export default CardsProfile
