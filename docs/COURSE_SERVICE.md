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
