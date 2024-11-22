import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useState, useEffect, useContext } from 'react'
import { Spinner } from '../components/Spinner'
import { AlertMessage } from '../components/AlertMessage'

export default function Login() {
  const { login, token, isLoading, message } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/profile')
    }
  }, [navigate, token])

  async function handleSubmit(e) {
    e.preventDefault()

    await login(email, password)
    if (!token) {
      setLoginError('¡Lo sentimos! Aún no tenemos activado este apartado.')
    }
  }
  return (
    <>
      {<AlertMessage>{message}</AlertMessage>}
      <section className="mt-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia Sesión
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="juan@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
                        required=""
                      ></input>
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Recuérdame
                      </label>
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 flex items-center mb-2"
                  disabled={isLoading} // Deshabilitar si está cargando
                >
                  {isLoading ? (
                    <Spinner>Iniciando Sesion...</Spinner>
                  ) : (
                    'Iniciar sesión'
                  )}
                </button>
                {!token && (
                  <span className="font-normal text-md text-red-600">
                    {loginError}
                  </span>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  ¿No tienes una cuenta aun?{' '}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
