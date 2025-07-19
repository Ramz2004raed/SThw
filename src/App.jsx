import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddStudent />} />
        <Route path='/edit/:id' element={<EditStudent />} />
      </Routes>
    </>
  )
}

export default App
