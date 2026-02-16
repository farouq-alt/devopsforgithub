// Utility functions for signup codes and pickup codes

// Generate a unique one-time signup code
export const generateSignupCode = () => {
  const prefix = 'SC'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// Generate a pickup code for an order
export const generatePickupCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude similar chars
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Validate signup code format
export const validateSignupCodeFormat = (code) => {
  if (!code || typeof code !== 'string') return false
  // Format: SC-TIMESTAMP-RANDOM
  const pattern = /^SC-[A-Z0-9]+-[A-Z0-9]+$/
  return pattern.test(code)
}

// Mock database for signup codes (in production, use backend)
const signupCodesDB = new Map()

// Initialize with some test codes
export const initializeTestCodes = () => {
  for (let i = 0; i < 5; i++) {
    const code = generateSignupCode()
    signupCodesDB.set(code, {
      code,
      used: false,
      createdAt: Date.now(),
      createdBy: 'admin',
      usedBy: null,
      usedAt: null
    })
  }
}

// Get all signup codes (admin only)
export const getAllSignupCodes = () => {
  return Array.from(signupCodesDB.values())
}

// Check if code exists and is valid
export const verifySignupCode = (code) => {
  if (!validateSignupCodeFormat(code)) {
    return { valid: false, error: 'Invalid code format' }
  }
  
  const codeData = signupCodesDB.get(code)
  
  if (!codeData) {
    return { valid: false, error: 'Code not found' }
  }
  
  if (codeData.used) {
    return { valid: false, error: 'Code already used' }
  }
  
  return { valid: true, codeData }
}

// Mark code as used
export const useSignupCode = (code, userId) => {
  const codeData = signupCodesDB.get(code)
  if (codeData && !codeData.used) {
    codeData.used = true
    codeData.usedBy = userId
    codeData.usedAt = Date.now()
    signupCodesDB.set(code, codeData)
    return true
  }
  return false
}

// Admin: Create new signup code
export const createSignupCode = (adminId) => {
  const code = generateSignupCode()
  signupCodesDB.set(code, {
    code,
    used: false,
    createdAt: Date.now(),
    createdBy: adminId,
    usedBy: null,
    usedAt: null
  })
  return code
}

// Admin: Deactivate a code
export const deactivateSignupCode = (code) => {
  const codeData = signupCodesDB.get(code)
  if (codeData && !codeData.used) {
    signupCodesDB.delete(code)
    return true
  }
  return false
}

// Admin: Resend code (mark as available again - use with caution)
export const resendSignupCode = (code) => {
  const codeData = signupCodesDB.get(code)
  if (codeData) {
    // Create a new code instead of reusing
    return createSignupCode(codeData.createdBy)
  }
  return null
}
