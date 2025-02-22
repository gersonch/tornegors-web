import { useState, useEffect, useContext } from 'react'
import BarsHeaderIcon from '../assets/icons/BarsHeaderIcon'
import CupTorneoIcon from '../assets/icons/CupTorneo'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function Header() {
  const [isActive, setIsActive] = useState(false)
  const { token, logout } = useContext(UserContext)

  const handleBarsBtn = () => {
    setIsActive((prevState) => !prevState)
  }

  const navBarStyle = `text-lg font-semibold font-sans lg:flex items-center ${
    isActive
      ? 'flex flex-col transition-all duration-300'
      : 'max-h-0 opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'
  }`

  const ulStyle = `${
    isActive
      ? 'absolute left-1/2 transform -translate-x-1/2 justify-center text-center bg-slate-900/90 rounded-3xl w-96 h-auto py-20'
      : 'flex flex-row gap-x-6 items-center'
  }`

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // 1024px es el tamaño para lg
        setIsActive(false)
      }
    }

    // Escuchar el evento resize
    window.addEventListener('resize', handleResize)

    // Llamar al manejar tamaño al montar el componente
    handleResize()

    // Limpiar el listener al desmontar
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className="mx-auto p-8 flex flex-col lg:flex-row items-center lg:justify-between relative w-full z-40">
      <div className="text-4xl font-bold font-dela tracking-wider">
        <h1>
          <Link to="/">TORNEGORS</Link>
        </h1>
      </div>
      <button className="lg:hidden my-6" onClick={handleBarsBtn}>
        <BarsHeaderIcon />
      </button>
      <div className={navBarStyle}>
        <ul className={ulStyle}>
          <li className="mb-8 lg:mb-0">
            <Link to="/" className="py-2 px-4">
              Inicio
            </Link>
          </li>
          <li className="mb-8 lg:mb-0">
            {token ? (
              <Link to="/profile" className="py-2 px-4 lg:flex lg:gap-1">
                Mi Perfil
              </Link>
            ) : (
              <Link
                to="/mis-torneos/play"
                className="py-2 px-4 lg:flex lg:gap-1"
              >
                <span className="hidden lg:flex lg:items-center">
                  <CupTorneoIcon />
                </span>
                Crear Torneo
              </Link>
            )}
          </li>
          <li className="mb-8 lg:mb-0">
            {token ? (
              <Link
                to="/profile"
                className="bg-blue-950 hover:bg-blue-800 transition-all py-2 px-4 rounded-full"
                onClick={() => logout()}
              >
                Cerrar Sesión
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-blue-950 hover:bg-blue-800 transition-all py-2 px-4 rounded-full"
              >
                Iniciar sesión
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
