/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import CloseIcon from '../assets/icons/CloseIcon'
import { UserContext } from '../context/UserContext'

export const AlertMessage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true) // Estado para controlar la visibilidad
  const { setMessage } = useContext(UserContext)

  if (!isVisible) return null // No renderiza nada si no es visible

  return (
    <div
      role="alert"
      className="alert alert-success flex items-center max-w-3xl mx-auto text-white"
    >
      <span className="flex-grow pl-2">{children}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setMessage('')
        }} // Oculta el mensaje
        className="ml-4 btn btn-sm btn-ghost"
        aria-label="Cerrar"
      >
        <CloseIcon />
      </button>
    </div>
  )
}
