# Keycloak Integration

## Overview
The LMS frontend integrates with Keycloak for authentication and user management. This document outlines the implementation details and configuration.

## Authentication Flow

### Login Process
1. User initiates login through the login component
2. After successful authentication:
   - User is redirected to the profile page
   - Access token and refresh token are stored
   - User role and information are retrieved

### Registration Process
1. User accesses registration page
2. Form submission triggers Keycloak registration
3. Email verification (if enabled)
4. Redirects to login after successful registration

## Implementation Details

### Keycloak Configuration
```typescript
{
  realm: 'lms-realm',
  url: 'http://localhost:8080/auth',
  clientId: 'lms-client'
}
```

### Keycloak Service
The `AuthService` handles:
- Login/logout operations
- Token management
- User role verification
- Session persistence

### Security Features
- JWT token validation
- Role-based access control
- Token refresh mechanism
- Secure storage of credentials

## User Roles
- Student: Basic access to courses and materials
- Coach: Enhanced access for teaching and management

## Integration Points
- Login component
- Registration component
- TO BE IMPLEMENTED: Auth guard for protected routes
- HTTP interceptors for token management

## Error Handling
- Authentication failures
- Token expiration
- Network issues
- Invalid credentials
 
