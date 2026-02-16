import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, restoreSession } from '../store/appSlice'
import { getAuthData } from '../utils/auth'
import { validateName, validateRole } from '../utils/validation'
import { ROLES } from '../utils/constants'

function Login() {
  const [role, setRole] = useState(ROLES.STUDENT)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  // Try to restore session on mount
  useEffect(() => {
    const authData = getAuthData()
    if (authData) {
      dispatch(restoreSession({
        user: authData.user.user,
        role: authData.user.role,
        userName: authData.user.userName,
        authToken: authData.token,
        sessionExpiry: authData.user.sessionExpiry
      }))
    }
  }, [dispatch])

  const handleLogin = () => {
    setError('')
    
    // Validate name
    const nameValidation = validateName(name)
    if (!nameValidation.valid) {
      setError(nameValidation.error)
      return
    }
    
    // Validate role
    if (!validateRole(role)) {
      setError('Invalid role selected')
      return
    }
    
    setIsLoading(true)
    
    // Simulate async login (in production, this would be an API call)
    setTimeout(() => {
      dispatch(login({
        user: `${role}_${Date.now()}`,
        role: role,
        userName: nameValidation.value
      }))
      setIsLoading(false)
    }, 300)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim() && !isLoading) {
      handleLogin()
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Moroccan Feast</h1>
        <p className="subtitle">Order authentic Moroccan cuisine</p>
        
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="name-input">Your Name</label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              maxLength={50}
              disabled={isLoading}
              autoComplete="name"
              aria-label="Your name"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role-select">I am a...</label>
            <select 
              id="role-select"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              disabled={isLoading}
              aria-label="Select your role"
            >
              <option value={ROLES.STUDENT}>Student</option>
              <option value={ROLES.SHOP}>Shop Owner</option>
              <option value={ROLES.RUNNER}>Delivery Runner</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button 
            className="login-btn"
            onClick={handleLogin}
            disabled={!name.trim() || isLoading}
            aria-label="Continue to dashboard"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
