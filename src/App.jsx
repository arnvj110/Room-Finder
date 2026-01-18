
import { Route, Routes } from 'react-router-dom'
import RoomFinderApp from './components/RoomFinderApp'
import Register from './pages/Register'
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
        <RoomFinderApp />
        } />
    </Routes>
  )
}

export default App
