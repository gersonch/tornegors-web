import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Liga from './views/Liga'
import Boards from './views/Boards'
import { UserContext } from './context/UserContext'

import PlayLiga from './views/PlayLiga'
import { useContext } from 'react'

function App() {
  const { token } = useContext(UserContext)
  return (
    <>
      <main className="max-w-full" id="main">
        <Header />
        <Routes>
          <Route path="/liga" element={<Liga />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boards" element={<Boards />} />
          <Route
            path="/signup"
            element={token ? <SignUp /> : <Navigate to="/login" />}
          />
          <Route path="mis-torneos/play" element={<PlayLiga />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App
