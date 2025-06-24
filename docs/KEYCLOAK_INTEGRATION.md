# Keycloak Integration

## Overview
The LMS frontend integrates with Keycloak for authentication, token management, and user session handling. This document outlines the login/registration flow, configuration, and relevant integration points.

## Authentication Flow

### Login Process
1. User initiates login through the login component.
2. On successful authentication:
   - The user is redirected to the **profile** or **dashboard** page.
   - Access and refresh tokens are stored.
   - Basic user information is retrieved and optionally cached.
   - Role-based data (e.g., `Student`, `Coach`) is extracted from the token.

### Registration Process
1. User accesses the registration page.
2. Submitting the form triggers a Keycloak-managed registration flow.
3. If enabled, Keycloak handles email verification.
4. After successful registration, the user is redirected to the login page.

## Implementation Details

### Keycloak Configuration
Configured in the service layer or environment as:
```typescript
{
  realm: 'lms-realm',
  url: 'http://localhost:8080/auth',
  clientId: 'lms-client'
}
```
### `keycloak-service.service.ts`
- Initializes and manages the Keycloak instance
- Handles login, logout, and token retrieval

### `http-keycloak.service.ts`
- Custom wrapper for making authenticated HTTP requests using Keycloak tokens
- Useful for isolating and centralizing HTTP logic

### `keycloak.interceptor.ts`
- Intercepts outgoing HTTP requests
- Attaches the Bearer token to authorized requests

## Token Response Type
- Defined in `keycloak-token-response.ts`
- Used for structured parsing of token responses

## User Roles
- **Student**: Access to view and interact with learning content
- **Coach**: Privileged access to manage classes, courses, modules, and codelabs

## Integration Points
- **Login component** – Triggers the login flow via Keycloak
- **Registration component** – Routes to Keycloak's registration form
- **HTTP Interceptors** – Attach tokens to protected API calls
- **Role Guard** *(in progress)* – Restricts access based on user roles

## To Be Implemented
- Role guard logic for route protection
- UI feedback for expired sessions or token errors
- Refresh token management and silent re-authentication
