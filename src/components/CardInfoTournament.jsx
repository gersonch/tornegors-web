import { useState } from 'react'
import CloseIcon from '../assets/icons/CloseIcon'
import ExclamationIcon from '../assets/icons/ExclamationIcon'
import RulesIcon from '../assets/icons/RulesIcon'

import PropTypes from 'prop-types'

CardInfoTournament.propTypes = {
  description: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  rules: PropTypes.string.isRequired,
}

export default function CardInfoTournament({ description, details, rules }) {
  const [isVisible, setIsVisible] = useState(false)

  const handleCloseInfo = () => {
    setIsVisible(false)
  }

  const handleOpenInfo = () => {
    setIsVisible(true)
  }

  return (
    <>
      {isVisible ? (
        <section className="max-w-lg lg:max-w-3xl mx-auto mt-10">
          <div className="bg-slate-600 px-8 py-4 mx-4 relative">
            <button className="absolute right-6" onClick={handleCloseInfo}>
              <CloseIcon />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-pretty">
              Formato Liga
            </h2>
            <p className="text-xl font-medium">{description}</p>
            <p className="text-pretty mt-4 text-blue-200 flex gap-4 items-center">
              <ExclamationIcon /> {details}
            </p>
            <p className="text-pretty mt-4 text-red-300 flex gap-4 items-center">
              <RulesIcon /> Reglas de desempate: {rules}.
            </p>
          </div>
        </section>
      ) : (
        <button
          onClick={handleOpenInfo}
          className="mx-auto mt-10 flex items-center gap-2 text-blue-500"
        >
          <ExclamationIcon /> {/* Ícono para abrir la card */}
          <span>Abrir Información del Torneo</span>
        </button>
      )}
    </>
  )
}
