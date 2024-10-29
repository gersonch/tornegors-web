import ExclamationIcon from '../assets/icons/ExclamationIcon'
import RulesIcon from '../assets/icons/RulesIcon'
import PropTypes from 'prop-types'

CardInfoTournament.propTypes = {
  description: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  rules: PropTypes.string.isRequired,
}

export default function CardInfoTournament({ description, details, rules }) {
  return (
    <section className="max-w-lg lg:max-w-3xl mx-auto mt-10 ">
      <div className="bg-slate-600 px-8 py-4 mx-4">
        <h2 className="text-3xl font-bold mb-4 text-pretty">Formato Liga</h2>
        <p className="text-xl font-medium">{description}</p>
        <p className="text-pretty mt-4 text-blue-200 flex gap-4 items-center">
          <ExclamationIcon /> {details}
        </p>
        <p className="text-pretty mt-4 text-red-300 flex gap-4 items-center">
          <RulesIcon /> Reglas de desempate: {rules}.
        </p>
      </div>
    </section>
  )
}
