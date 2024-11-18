/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const data = await response.json()
      if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict`
        setToken(data.token)
        localStorage.setItem('token', data.token) // Guardar el token en localStorage
        console.log(data)
      } else {
        console.error('token no encontrado', data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (firstname, lastname, email, password, nationality) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          nationality,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        console.log('registro exitoso', data)
      } else {
        console.error('Error en el registro', data)
      }
    } catch (err) {
      console.error('Error en el registro', err)
    }
  }

  const logout = () => {
    setToken(null)

    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    document.cookie = 'token=; path=/; max-age=0; secure; sameSite=strict'
  }

  return (
    <UserContext.Provider value={{ token, login, logout, signup, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
