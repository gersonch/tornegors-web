/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

CardsProfile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: PropTypes.string.isRequired,
  // Se asegura de que `className` siempre esté presente
}

function CardsProfile({ title, description, type, style, id }) {
  return (
    <Link
      to={`mis-torneos/${id}`}
      className=" bg-cyan-950 px-8 py-4 rounded-xl flex flex-col gap-4"
    >
      <h5 className=" text-xl font-bold">{title}</h5>
      <p className=" text-white/70">{description}</p>
      <span
        className={`text-sm font-medium px-1 py-0.5 rounded max-w-28 flex-nowrap flex text-center justify-center ${style} `}
      >
        {type}
      </span>
    </Link>
  )
}

export default CardsProfile
