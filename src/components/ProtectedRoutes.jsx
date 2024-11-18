/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function ProtectedRoute({ children }) {
  const { token, userData } = useContext(UserContext)

  if (!token || !userData) {
    return <Navigate to="/login" />
  }

  return children
}
