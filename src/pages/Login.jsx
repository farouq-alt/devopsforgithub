import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, restoreSession } from '../store/appSlice'
import { getAuthData } from '../utils/auth'
import { validateName, validateRole } from '../utils/validation'
import { ROLES } from '../utils/constants'
import { verifySignupCode, useSignupCode, initializeTestCodes } from '../utils/codes'

// Initialize test codes on module load
initializeTestCodes()

function Login() {
  const [role, setRole] = useState(ROLES.STUDENT)
  const [name, setName] = useState('')
  const [signupCode, setSignupCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
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
        sessionExpiry: authData.user.sessionExpiry,
        signupCode: authData.user.signupCode,
        balance: authData.user.balance || 0,
        balanceHistory: authData.user.balanceHistory || []
      }))
    }
  }, [dispatch])

  const handleLogin = () => {
    setError('')
    
    // For students, require signup code
    if (role === ROLES.STUDENT) {
      if (!signupCode.trim()) {
        setError('Signup code is required for students')
        return
      }

      // Verify signup code
      const verification = verifySignupCode(signupCode.trim())
      if (!verification.valid) {
        setError(verification.error)
        return
      }
    }
    
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
      const userId = `${role}_${Date.now()}`
      
      // Mark signup code as used for students
      if (role === ROLES.STUDENT) {
        useSignupCode(signupCode.trim(), userId)
      }

      dispatch(login({
        user: userId,
        role: role,
        userName: nameValidation.value,
        signupCode: role === ROLES.STUDENT ? signupCode.trim() : null,
        balance: role === ROLES.STUDENT ? 0 : undefined // Students start with 0 balance
      }))
      setIsLoading(false)
    }, 300)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim() && !isLoading) {
      if (role === ROLES.STUDENT && !signupCode.trim()) return
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
            <label htmlFor="role-select">I am a...</label>
            <select 
              id="role-select"
              value={role} 
              onChange={(e) => {
                setRole(e.target.value)
                setError('')
              }}
              disabled={isLoading}
              aria-label="Select your role"
            >
              <option value={ROLES.STUDENT}>Student</option>
              <option value={ROLES.SHOP}>Shop Owner</option>
              <option value={ROLES.RUNNER}>Delivery Runner</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>
          </div>

          {role === ROLES.STUDENT && (
            <div className="form-group">
              <label htmlFor="code-input">Signup Code</label>
              <input
                id="code-input"
                type="text"
                value={signupCode}
                onChange={(e) => setSignupCode(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                placeholder="SC-XXXXX-XXXX"
                maxLength={20}
                disabled={isLoading}
                autoComplete="off"
                aria-label="Signup code"
                aria-required="true"
              />
              <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                Enter the one-time code provided to you
              </small>
            </div>
          )}

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

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button 
            className="login-btn"
            onClick={handleLogin}
            disabled={!name.trim() || isLoading || (role === ROLES.STUDENT && !signupCode.trim())}
            aria-label="Continue to dashboard"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>

          {role === ROLES.STUDENT && (
            <button 
              className="link-btn"
              onClick={() => setShowSignup(!showSignup)}
              style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {showSignup ? 'Hide' : 'Show'} available test codes
            </button>
          )}

          {showSignup && role === ROLES.STUDENT && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', fontSize: '0.9rem' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Test Codes (for demo):</p>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                Login as Admin to generate new codes, or use the codes displayed in the Admin dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
