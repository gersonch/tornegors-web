import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

import { useContext, useState } from 'react'
import { Spinner } from '../components/Spinner'
import { countries } from '../components/info/countries'

function SignUp() {
  const { signup } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [nationality, setNationality] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  async function checkInfo(e) {
    e.preventDefault()

    try {
      setIsLoading(true)
      setMessage('') // Limpiar mensaje previo
      if (password !== confirmPassword) {
        setMessage('Las contraseñas no coinciden.')
        setIsSuccess(false)
        return
      }

      const result = await signup(
        firstname,
        lastname,
        email,
        password,
        nationality
      )
      if (result && result.message) {
        setMessage(result.message)
        setIsSuccess(result.success)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setMessage('Ocurrió un error desconocido')
        setIsSuccess(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value)
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center">
              Crea tu Cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={checkInfo}>
              <div className="flex justify-between mb-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600"
                    placeholder="Juan"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600"
                    placeholder="Pérez"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
              </div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="nationality"
                className="block mb-2 text-sm font-medium"
              >
                Nacionalidad
              </label>
              <select
                id="nationality"
                className="bg-gray-700 border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Selecciona
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirma Contraseña
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  required
                />
              </div>
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  Acepto los{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Términos y condiciones
                  </Link>
                </label>
              </div>
              {isLoading ? (
                <button className="w-full text-white bg-primary-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-800 transition">
                  <Spinner></Spinner>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-800 transition"
                >
                  Crea tu cuenta
                </button>
              )}

              {message && (
                <p
                  className={`message ${isSuccess ? 'text-green-500' : 'text-red-500'}`}
                >
                  {message}
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya estás registrado?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
