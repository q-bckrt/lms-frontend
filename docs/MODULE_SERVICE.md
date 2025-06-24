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
