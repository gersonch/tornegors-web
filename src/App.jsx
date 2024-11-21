import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Liga from './views/Liga'

import Profile from './views/Profile'
import { UserContext } from './context/UserContext'

import PlayLiga from './views/PlayLiga'
import { useContext } from 'react'
import { TournamentProvider } from './context/TournamentContext'

function App() {
  const { token } = useContext(UserContext)
  return (
    <>
      <main className="max-w-full" id="main">
        <Header />
        <TournamentProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/boards" />
            <Route path="/mis-torneos/play" element={<PlayLiga />} />
            <Route
              path="/profile/mis-torneos/:id"
              element={token ? <Liga /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </TournamentProvider>
        <Footer />
      </main>
    </>
  )
}

export default App
