/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [userData, setUserData] = useState('')
  const URL = 'http://localhost:3000/api/user'
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

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
        setUserData(data)
        return { success: true, message: 'Registro exitoso' }
      } else {
        return {
          success: false,
          message: data.message || 'Error en el registro',
        }
      }
    } catch (err) {
      console.error('Error en el registro', err)
    }
  }

  const logout = () => {
    setIsLoading(true)
    try {
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      document.cookie = 'token=; path=/; max-age=0; secure; sameSite=strict'
      setMessage('Has cerrado sesión exitosamente')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserById = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
      const data = await response.json()
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (data) {
        setUserData(data)
      } else {
        console.error('No se pudo obtener el usuario')
      }
    } catch (err) {
      console.error('Error al obtener el usuario:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        token,
        login,
        logout,
        signup,
        isLoading,
        userData,
        getUserById,
        message,
        setMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
