# Dummy User Logic

## Overview
This document describes the temporary dummy user implementation used during development before the full Keycloak integration is complete.

## Current Implementation

### User Service
The `UserService` currently provides:
- Basic user information retrieval
- Role management
- Session handling

### Dummy Data
```typescript
{
  username: 'JDoe',
  role: 'student',
  // Additional user properties
}
```

## Temporary Features

### Authentication
- Local storage-based session management
- Hardcoded user roles
- Basic login/logout functionality

### User Management
- Static user data
- Role-based access control simulation
- Session persistence

## Integration Points
- Dashboard component
- Navigation components

## Limitations
- No real authentication
- Limited user management
- No password handling
- No session security

## Migration Path
This implementation will be replaced by:
1. Keycloak authentication
2. Real user management
3. Secure session handling
4. Proper role management

## Development Notes
- This is a temporary solution
- Not suitable for production
- Will be deprecated after Keycloak integration
- Used for UI/UX development
