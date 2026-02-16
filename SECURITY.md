# Security Enhancements

## Overview
This document outlines the security improvements implemented in the School Food Ordering application.

## Authentication & Authorization

### Token-Based Authentication
- **Auth Tokens**: Generated using base64 encoding with user ID, role, timestamp, and random string
- **Token Expiry**: 24-hour session timeout with automatic logout
- **Session Persistence**: Secure localStorage storage with validation on app load
- **Token Verification**: Validates token structure and expiry on every session restore

### Role-Based Access Control (RBAC)
- **Student**: Can only view shops, place orders, and view their own orders
- **Shop Owner**: Can manage their shop status and mark orders as ready
- **Runner**: Can update order pickup and delivery status
- **Admin**: Full system access including shop management and global settings

## Input Validation

### Client-Side Validation
- **Name Validation**: 
  - Minimum 2 characters, maximum 50 characters
  - XSS prevention (blocks script tags and javascript: protocol)
  - Sanitization of HTML tags
  
- **Order Validation**:
  - Cart size limits (max 20 items)
  - Quantity validation (1-99 per item)
  - Price validation (non-negative)
  - Shop availability checks

### Data Sanitization
- All user inputs are trimmed and sanitized
- HTML tags are stripped from text inputs
- Malicious patterns are detected and rejected

## State Management Security

### Redux Store Protection
- **Action Validation**: All actions validate user roles before execution
- **State Persistence**: Only non-sensitive data is persisted to localStorage
- **Ownership Verification**: Shop actions verify owner ID or admin role

### Order Security
- Orders include user ID for ownership verification
- Status transitions are role-restricted
- Order cancellation only allowed for queued orders by the owner

## Session Management

### Auto-Logout Features
- Session expiry check every 60 seconds
- Automatic logout on token expiration
- Clear all stored data on logout

### Session Restoration
- Validates stored tokens on app load
- Checks session expiry before restoration
- Falls back to login if validation fails

## Error Handling

### Error Boundary
- Catches React component errors
- Prevents app crashes
- Provides user-friendly error messages
- Offers page refresh option

### Validation Errors
- Clear error messages for validation failures
- Non-blocking error display
- Automatic error clearing on successful actions

## Best Practices Implemented

1. **No Sensitive Data in State**: Auth tokens are validated but not exposed
2. **Debounced State Persistence**: Reduces localStorage write operations
3. **Immutable State Updates**: Using Redux Toolkit's Immer integration
4. **Type Safety**: Consistent use of constants for roles, statuses, and keys
5. **Accessibility**: ARIA labels and semantic HTML throughout

## Security Considerations for Production

### Current Limitations (Demo App)
- Auth tokens are client-side only (use JWT from backend in production)
- No HTTPS enforcement (required in production)
- No rate limiting (implement on backend)
- No CSRF protection (add tokens for state-changing operations)

### Recommended Production Enhancements
1. **Backend Authentication**: Implement proper JWT with refresh tokens
2. **API Security**: Add rate limiting, CORS, and request validation
3. **HTTPS Only**: Enforce secure connections
4. **Content Security Policy**: Add CSP headers
5. **Input Sanitization**: Server-side validation and sanitization
6. **SQL Injection Prevention**: Use parameterized queries
7. **XSS Prevention**: Implement Content Security Policy
8. **Audit Logging**: Track all security-relevant actions
9. **Password Hashing**: Use bcrypt or Argon2 for passwords
10. **Two-Factor Authentication**: Add 2FA for admin accounts

## Testing Security

### Manual Testing Checklist
- [ ] Try to access admin features as student
- [ ] Attempt XSS in name field
- [ ] Test session expiry after 24 hours
- [ ] Verify logout clears all data
- [ ] Test order placement with invalid data
- [ ] Verify shop owners can only manage their shops
- [ ] Test concurrent order placement at capacity

### Automated Testing (Recommended)
- Unit tests for validation functions
- Integration tests for auth flow
- E2E tests for role-based access
- Security scanning with tools like OWASP ZAP

## Reporting Security Issues

If you discover a security vulnerability, please email security@example.com instead of using the issue tracker.
