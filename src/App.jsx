import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Liga from './views/Liga'

import PlayLiga from './views/PlayLiga'

function App() {
  return (
    <>
      <main className="max-w-full" id="main">
        <Header />

        <Routes>
          <Route path="/liga" element={<Liga />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="mis-torneos/play" element={<PlayLiga />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App
