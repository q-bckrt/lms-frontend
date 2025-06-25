# SubmoduleService

## Overview
The `SubmoduleService` is responsible for handling operations related to submodules. It provides methods to create, retrieve, and update submodules by interacting with the backend API.

## Location
`/src/app/services/submodule-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For making HTTP requests.
- `Observable` from `rxjs`: For handling asynchronous operations.

## Methods

### `createSubmodule(module: { title: string }): Observable<any>`
Creates a new submodule.

- **HTTP Method:** `POST`
- **Endpoint:** `/submodules`
- **Parameters:**
  - `module`: An object containing the submodule title.
- **Returns:** `Observable<any>` – The created submodule response.

#### Example

```typescript
const newSubmodule = { title: 'Submodule A' };
this.submoduleService.createSubmodule(newSubmodule).subscribe(response => {
  console.log('Submodule created:', response);
});
```

### `getAllSubmodules(): Observable<Array<{ id: number; title: string }>>`
Fetches all available submodules.

- **HTTP Method:** `GET`
- **Endpoint:** `/submodules`
- **Returns:** `Observable<Array<{ id: number; title: string }>>` – A list of submodules with their IDs and titles.

#### Example

```typescript
this.submoduleService.getAllSubmodules().subscribe(submodules => {
  console.log('All submodules:', submodules);
});
```

### `getSubmodule(id: number): Observable<any>`
Fetches details for a specific submodule by ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/submodules/{id}`
- **Parameters:**
  - `id`: The ID of the submodule to retrieve.
- **Returns:** `Observable<any>` – The submodule details.

#### Example

```typescript
this.submoduleService.getSubmodule(3).subscribe(submodule => {
  console.log('Submodule details:', submodule);
});
```

### `updateSubmoduleTitle(submoduleId: number, submoduleInput: { title: string }): Observable<any>`
Updates the title of an existing submodule.

- **HTTP Method:** `PUT`
- **Endpoint:** `/submodules/{submoduleId}`
- **Parameters:**
  - `submoduleId`: The ID of the submodule to update.
  - `submoduleInput`: An object containing the new title.
- **Returns:** `Observable<any>` – The updated submodule response.

#### Example

```typescript
const updatedSubmodule = { title: 'Updated Title' };
this.submoduleService.updateSubmoduleTitle(3, updatedSubmodule).subscribe(response => {
  console.log('Submodule updated:', response);
});
```
