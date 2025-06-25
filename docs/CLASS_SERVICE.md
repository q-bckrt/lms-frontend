# ClassService

## Overview
The `ClassService` is an Angular service responsible for handling all operations related to classes. It supports creating new classes, retrieving classes by ID or user, linking courses to classes, and fetching all existing classes.

## Location
`/src/app/services/class-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For making HTTP requests.
- `Observable` from `rxjs`: For handling asynchronous operations.
- `classModel`: A model representing a class object.

## API Base URL

```typescript
private apiUrl = 'http://localhost:8080/classes';
```

---

## Methods

### `createClass(classTitle: string, coachUserName: string): Observable<any>`
Creates a new class and assigns it to a coach.

- **HTTP Method:** `POST`
- **Endpoint:** `/classes/{coachUserName}`
- **Parameters:**
  - `classTitle`: The title of the new class.
  - `coachUserName`: The username of the coach who will own the class.
- **Returns:** `Observable<any>` – The created class response.

#### Example

```typescript
this.classService.createClass('Frontend Bootcamp', 'coach123').subscribe(response => {
  console.log('Class created:', response);
});
```

### `linkCourseToClass(classId: number, courseId: number): Observable<any>`
Links an existing course to a class.

- **HTTP Method:** `PUT`
- **Endpoint:** `/classes/linkCourseClass/{classId}/{courseId}`
- **Parameters:**
  - `classId`: The ID of the class.
  - `courseId`: The ID of the course to link.
- **Returns:** `Observable<any>` – The updated class response.

#### Example

```typescript
this.classService.linkCourseToClass(10, 5).subscribe(response => {
  console.log('Course linked to class:', response);
});
```

### `findClassById(classId: number): Observable<classModel>`
Fetches a class by its ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/classes/{classId}`
- **Parameters:**
  - `classId`: The ID of the class to retrieve.
- **Returns:** `Observable<classModel>` – The class object.

#### Example

```typescript
this.classService.findClassById(10).subscribe(classData => {
  console.log('Class data:', classData);
});
```

### `findAllClasses(): Observable<classModel[]>`
Retrieves all classes in the system.

- **HTTP Method:** `GET`
- **Endpoint:** `/classes`
- **Returns:** `Observable<classModel[]>` – An array of all class objects.

#### Example

```typescript
this.classService.findAllClasses().subscribe(classes => {
  console.log('All classes:', classes);
});
```

### `findClassesPerUser(username: string): Observable<classModel[]>`
Fetches all classes assigned to a specific user.

- **HTTP Method:** `GET`
- **Endpoint:** `/classes/get-classes/{username}`
- **Parameters:**
  - `username`: The username of the user.
- **Returns:** `Observable<classModel[]>` – An array of class objects associated with the user.

#### Example

```typescript
this.classService.findClassesPerUser('student01').subscribe(classes => {
  console.log('User classes:', classes);
});
```
