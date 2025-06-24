# RoleService

## Overview
The `RoleService` is an Angular service responsible for determining and exposing the current user's role (`coach` or `student`) based on the decoded Keycloak access token. It uses a `BehaviorSubject` to store and stream role updates across the application.

## Location
`/src/app/services/role-service.service.ts`

## Dependencies
- `KeycloakServiceService`: Provides access to the current Keycloak token.
- `BehaviorSubject` from RxJS: Used to manage reactive role state.

## Features

### Reactive Role Management
- Internally maintains a `BehaviorSubject<string>` to store the current role.
- Exposes an observable `userRole$` for components to subscribe to role changes.

### Role Initialization
- Automatically called in the constructor.
- Decodes the access token and inspects the `resource_access.lms.roles` array.
- If `'COACH'` is present, sets the role to `'coach'`.
- If `'STUDENT'` is present, sets the role to `'student'`.
- If no recognized role is found or the token is invalid, the role remains unset (`''`).

> ⚠️ **Note:** The service no longer defaults to `'student'` if no token is found or parsing fails. This allows for a clearer distinction between authenticated and unauthenticated users.

## Methods

### `refreshRole(): void`
Re-initializes the user's role. Should be called after login or logout to refresh the role state.

### `isCoach(): boolean`
Returns `true` if the current role is `'coach'`.

### `isStudent(): boolean`
Returns `true` if the current role is `'student'`.

### `getCurrentRole(): string`
Returns the current role as a string. May return an empty string if no role is set.

### `hasRole(role: string): boolean`
Checks if the current role matches the given `role` string.

## Token Parsing Logic
The token is decoded and parsed as follows:

```typescript
const tokenData = JSON.parse(atob(token.split('.')[1]));

if (tokenData.resource_access?.lms?.roles?.includes('COACH')) {
  this.userRole.next('coach');
} else if (tokenData.resource_access?.lms?.roles?.includes('STUDENT')) {
  this.userRole.next('student');
} else {
  this.userRole.next('');
}
