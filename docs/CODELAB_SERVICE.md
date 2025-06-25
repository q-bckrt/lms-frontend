# CodelabService

## Overview
The `CodelabService` provides methods to manage codelabs, their comments, and track progress per user. It interacts with a backend API to perform CRUD operations on codelabs and fetch user progress data.

## Location
`/src/app/services/codelab-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For HTTP communication with the backend.
- `Observable` from `rxjs`: To handle asynchronous data streams.
- `Codelab`, `CodelabComment`, and `progressPerUser` models.

## API Base URL

```typescript
private baseUrl = 'http://localhost:8080';
```

---

## Methods

### `createCodelab(codelab: Codelab): Observable<Codelab>`
Creates a new codelab.

- **HTTP Method:** `POST`
- **Endpoint:** `/codelabs`
- **Parameters:**
  - `codelab`: A `Codelab` object containing `title`, `details`, and `parentSubmoduleId`.
- **Returns:** `Observable<Codelab>` – The created codelab object.

#### Example

```typescript
const newCodelab = { id: 0, title: 'Intro to Git', details: 'Basics of Git', parentSubmoduleId: 1 };
this.codelabService.createCodelab(newCodelab).subscribe(created => {
  console.log('Codelab created:', created);
});
```

### `getAllCodelabs(): Observable<Codelab[]>`
Fetches all available codelabs.

- **HTTP Method:** `GET`
- **Endpoint:** `/codelabs`
- **Returns:** `Observable<Codelab[]>` – A list of all codelabs.

#### Example

```typescript
this.codelabService.getAllCodelabs().subscribe(codelabs => {
  console.log('All codelabs:', codelabs);
});
```

### `getCodelab(id: number): Observable<Codelab>`
Fetches details for a specific codelab by ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/codelabs/{id}`
- **Parameters:**
  - `id`: The ID of the codelab.
- **Returns:** `Observable<Codelab>` – The requested codelab object.

#### Example

```typescript
this.codelabService.getCodelab(1).subscribe(codelab => {
  console.log('Codelab details:', codelab);
});
```

### `getCodelabComments(codelabId: number): Observable<CodelabComment[]>`
Retrieves all comments for a given codelab.

- **HTTP Method:** `GET`
- **Endpoint:** `/codelabs/{codelabId}/comments`
- **Parameters:**
  - `codelabId`: The ID of the codelab.
- **Returns:** `Observable<CodelabComment[]>` – A list of comments.

#### Example

```typescript
this.codelabService.getCodelabComments(1).subscribe(comments => {
  console.log('Codelab comments:', comments);
});
```

### `updateCodelab(id: number, data: Partial<Codelab>): Observable<Codelab>`
Updates a codelab with new data.

- **HTTP Method:** `PUT`
- **Endpoint:** `/codelabs/{id}`
- **Parameters:**
  - `id`: The ID of the codelab to update.
  - `data`: Partial data containing any fields to update.
- **Returns:** `Observable<Codelab>` – The updated codelab.

#### Example

```typescript
this.codelabService.updateCodelab(1, { title: 'Updated Title' }).subscribe(updated => {
  console.log('Codelab updated:', updated);
});
```

### `getAllProgressLevels(): Observable<string[]>`
Fetches all available progress level options.

- **HTTP Method:** `GET`
- **Endpoint:** `/codelabs/progress-levels`
- **Returns:** `Observable<string[]>` – A list of possible progress levels.

#### Example

```typescript
this.codelabService.getAllProgressLevels().subscribe(levels => {
  console.log('Progress levels:', levels);
});
```

### `getCurrentProgressLevelForUser(codelabId: number, userName: string): Observable<progressPerUser>`
Gets the current progress level for a specific user on a specific codelab.

- **HTTP Method:** `GET`
- **Endpoint:** `/codelabs/{codelabId}/progress-level/{userName}`
- **Parameters:**
  - `codelabId`: The ID of the codelab.
  - `userName`: The username of the user.
- **Returns:** `Observable<progressPerUser>` – The user's progress level on the codelab.

#### Example

```typescript
this.codelabService.getCurrentProgressLevelForUser(1, 'alice').subscribe(progress => {
  console.log('User progress:', progress);
});
```
