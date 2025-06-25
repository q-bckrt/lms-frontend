# ModuleService

## Overview
The `ModuleService` manages operations related to modules, including creation and retrieval. It interacts with the backend via HTTP requests.

## Location
`/src/app/services/module-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For making HTTP requests.
- `Observable` from `rxjs`: For handling asynchronous streams.
- `KeycloakServiceService`: (Injected, but not currently used — reserved for token-based logic if needed later.)

---

## Methods

### `createModule(module: { title: string }): Observable<any>`
Creates a new module.

- **HTTP Method:** `POST`
- **Endpoint:** `/modules`
- **Parameters:**
  - `module`: An object containing the module title.
- **Returns:** `Observable<any>` – The created module response.

#### Example

```typescript
const newModule = { title: 'Module 1' };
this.moduleService.createModule(newModule).subscribe(response => {
  console.log('Module created:', response);
});
```
### `getAllModules(): Observable<Array<{ id: number; title: string }>>`
Fetches all available modules.

- **HTTP Method:** `GET`
- **Endpoint:** `/modules`
- **Returns:** `Observable<Array<{ id: number; title: string }>>` – A list of all modules with their IDs and titles.

#### Example

```typescript
this.moduleService.getAllModules().subscribe(modules => {
  console.log('All modules:', modules);
});
```

### `getOneModule(id: number): Observable<any>`
Fetches details for a specific module by ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/modules/{id}`
- **Parameters:**
  - `id`: The ID of the module to retrieve.
- **Returns:** `Observable<any>` – The module object or details for the specified ID.

#### Example

```typescript
this.moduleService.getOneModule(1).subscribe(module => {
  console.log('Module details:', module);
});
```

### `updateModuleTitle(moduleId: number, moduleInput: { title: string }): Observable<any>`
Updates the title of an existing module.

- **HTTP Method:** `PUT`
- **Endpoint:** `/modules/{moduleId}`
- **Parameters:**
  - `moduleId`: The ID of the module to update.
  - `moduleInput`: An object containing the new title.
- **Returns:** `Observable<any>` – The updated module response.

#### Example

```typescript
const updatedModule = { title: 'Updated Module Title' };
this.moduleService.updateModuleTitle(1, updatedModule).subscribe(response => {
  console.log('Module updated:', response);
});
```

### `addSubmoduleToModule(moduleId: number, submoduleId: number): Observable<any>`
Associates a submodule with a specific module.

- **HTTP Method:** `PUT`
- **Endpoint:** `/modules/{moduleId}/submodules/{submoduleId}`
- **Parameters:**
  - `moduleId`: The ID of the module to which the submodule will be added.
  - `submoduleId`: The ID of the submodule to associate.
- **Returns:** `Observable<any>` – The updated module response after association.

#### Example

```typescript
this.moduleService.addSubmoduleToModule(1, 5).subscribe(response => {
  console.log('Submodule added to module:', response);
});
```
