# UserService

## Overview
The `UserService` is an Angular service responsible for managing user-related operations by interacting with the backend API. It handles retrieving user profiles, updating user information, and assigning classes to users.

## Location
`/src/app/services/user-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For making HTTP requests.
- `Observable` from `rxjs`: For handling asynchronous data streams returned by HTTP operations.

## API Base URL

```typescript
private apiUrl = 'http://localhost:8080/users';
```

## Methods

### `getUserProfile(username: string): Observable<any>`
Retrieves the profile information of a user by their username.

- **HTTP Method:** `GET`
- **Endpoint:** `/users/{username}`
- **Parameters:**
  - `username`: The username of the user to retrieve.
- **Returns:** `Observable<any>` – The user profile data.

#### Example

```typescript
this.userService.getUserProfile('alice').subscribe(profile => {
  console.log('User profile:', profile);
});
```

### `updateUserProfile(username: string, updatedData: any): Observable<any>`
Updates a user's profile with the provided data.

- **HTTP Method:** `PUT`
- **Endpoint:** `/users/{username}/edit`
- **Parameters:**
  - `username`: The user whose data should be updated.
  - `updatedData`: An object containing the updated user fields.
- **Returns:** `Observable<any>` – The updated profile response.

#### Example

```typescript
const newProfileData = { firstName: 'Alice', lastName: 'Smith' };
this.userService.updateUserProfile('alice', newProfileData).subscribe(response => {
  console.log('Profile updated:', response);
});
```

### `assignClassToUser(username: string, classId: number): Observable<any>`
Assigns a class to a specific user.

- **HTTP Method:** `PUT`
- **Endpoint:** `/users/{username}/edit/class?classId={classId}`
- **Parameters:**
  - `username`: The username of the user to assign the class to.
  - `classId`: The ID of the class to be assigned.
- **Returns:** `Observable<any>` – The result of the assignment.

#### Example

```typescript
this.userService.assignClassToUser('alice', 42).subscribe(response => {
  console.log('Class assigned:', response);
});
```
