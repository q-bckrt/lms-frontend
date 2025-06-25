# CourseService

## Overview
The `CourseService` handles operations related to course creation, retrieval, and module association. It communicates with the backend via HTTP requests.

## Location
`/src/app/services/course-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For making HTTP requests.
- `Observable` from `rxjs`: For handling asynchronous responses.

---

## Methods

### `createCourse(course: { title: string }): Observable<any>`
Creates a new course.

- **HTTP Method:** `POST`
- **Endpoint:** `/courses`
- **Parameters:**
  - `course`: An object containing the course title.
- **Returns:** `Observable<any>` – The created course response.

#### Example

```typescript
const newCourse = { title: 'Intro to Angular' };
this.courseService.createCourse(newCourse).subscribe(response => {
  console.log('Course created:', response);
});
```

### `getAllCourses(): Observable<Array<{ id: number; title: string }>>`
Fetches a list of all courses.

- **HTTP Method:** `GET`
- **Endpoint:** `/courses`
- **Returns:** `Observable<Array<{ id: number; title: string }>>` – A list of courses with their IDs and titles.

#### Example

```typescript
this.courseService.getAllCourses().subscribe(courses => {
  console.log('All courses:', courses);
});
```

### `getOneCourse(id: number): Observable<any>`
Fetches details for a specific course by ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/courses/{id}`
- **Parameters:**
  - `id`: The ID of the course to retrieve.
- **Returns:** `Observable<any>` – The course object or details for the specified ID.

#### Example

```typescript
this.courseService.getOneCourse(1).subscribe(course => {
  console.log('Course details:', course);
});
```


### `addModuleToCourse(courseId: number, moduleId: number): Observable<any>`
Associates a module with a course.

- **HTTP Method:** `PUT`
- **Endpoint:** `/courses/{courseId}/modules/{moduleId}`
- **Parameters:**
  - `courseId`: ID of the course.
  - `moduleId`: ID of the module to associate.
- **Returns:** `Observable<any>` – The updated course response.

#### Example

```typescript
this.courseService.addModuleToCourse(1, 10).subscribe(response => {
  console.log('Module added to course:', response);
});
```

### `updateCourseTitle(courseId: number, courseInput: { title: string }): Observable<any>`
Updates the title of an existing course.

- **HTTP Method:** `PUT`
- **Endpoint:** `/courses/{courseId}`
- **Parameters:**
  - `courseId`: The ID of the course to update.
  - `courseInput`: An object containing the new title.
- **Returns:** `Observable<any>` – The updated course response.

#### Example

```typescript
const updatedCourse = { title: 'Advanced Angular' };
this.courseService.updateCourseTitle(1, updatedCourse).subscribe(response => {
  console.log('Course updated:', response);
});
```
