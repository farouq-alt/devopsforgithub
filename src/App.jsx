import { useSelector } from 'react-redux'
import './App.css'
import Login from './pages/Login'
import StudentDash from './pages/StudentDash'
import ShopDash from './pages/ShopDash'
import RunnerDash from './pages/RunnerDash'
import AdminDash from './pages/AdminDash'

function App() {
  const { isLoggedIn, role } = useSelector(state => state.app)

  if (!isLoggedIn) {
    return <Login />
  }

  return (
    <div className="app">
      {role === 'student' && <StudentDash />}
      {role === 'shop' && <ShopDash />}
      {role === 'runner' && <RunnerDash />}
      {role === 'admin' && <AdminDash />}
    </div>
  )
}

export default App
