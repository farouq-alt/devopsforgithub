import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/appSlice'

function Login() {
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (!name.trim()) return
    dispatch(login({
      user: `${role}_${Date.now()}`,
      role: role,
      userName: name
    }))
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>🍕 School Food Ordering</h1>
        <p className="subtitle">Order food during your break</p>
        
        <div className="login-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="form-group">
            <label>I am a...</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="shop">Shop Owner</option>
              <option value="runner">Delivery Runner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            className="login-btn"
            onClick={handleLogin}
            disabled={!name.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
