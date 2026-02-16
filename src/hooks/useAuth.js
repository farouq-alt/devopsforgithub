import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/appSlice'
import { verifyAuthToken } from '../utils/auth'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { authToken, sessionExpiry, isLoggedIn } = useSelector(state => state.app)

  useEffect(() => {
    if (!isLoggedIn) return

    // Verify token is still valid
    if (authToken) {
      const verified = verifyAuthToken(authToken)
      if (!verified) {
        dispatch(logout())
        return
      }
    }

    // Check session expiry
    if (sessionExpiry && Date.now() >= sessionExpiry) {
      dispatch(logout())
      return
    }

    // Set up interval to check session expiry
    const interval = setInterval(() => {
      if (sessionExpiry && Date.now() >= sessionExpiry) {
        dispatch(logout())
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [authToken, sessionExpiry, isLoggedIn, dispatch])

  return { isLoggedIn }
}
