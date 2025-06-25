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

### `getClassOverviews(userName: string): Observable<classOverviewModel[]>`
Retrieves a list of class overviews for the specified user, including associated coaches and students.

- **HTTP Method:** `GET`
- **Endpoint:** `/users/{userName}/class-overview`
- **Parameters:**
  - `userName`: The username of the user whose class overviews are to be retrieved.
- **Returns:** `Observable<classOverviewModel[]>` – A list of class overview objects, each containing:
  - `id`: Class ID
  - `title`: Class title
  - `courseId`: ID of the associated course (if any)
  - `courseTitle`: Title of the associated course (if any)
  - `coaches`: An array of users with the role `COACH`
  - `students`: An array of users with the role `STUDENT`

#### Example

```typescript
this.userService.getClassOverviews('alice').subscribe(classOverviews => {
  console.log('Class overviews:', classOverviews);
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

### `setCurrentProgressLevel(userName: string, codelabId: number, progressLevel: string): Observable<boolean>`
Updates the current progress level of a user for a specific codelab.

- **HTTP Method:** `PUT`
- **Endpoint:** `/users/{userName}/edit/codelab/{codelabId}?progressLevel={progressLevel}`
- **Parameters:**
  - `userName`: The username of the user whose progress is being updated.
  - `codelabId`: The ID of the codelab.
  - `progressLevel`: The new progress level to set (e.g., `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`).
- **Returns:** `Observable<boolean>` – Indicates whether the update was successful.

#### Example

```typescript
this.userService.setCurrentProgressLevel('alice', 7, 'IN_PROGRESS').subscribe(success => {
  console.log('Progress level updated:', success);
});
```
