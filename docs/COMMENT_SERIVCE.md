# CommentService

## Overview
The `CommentService` is responsible for handling the posting of comments on codelabs. It communicates with the backend API to submit user-generated comments for a specific codelab.

## Location
`/src/app/services/comment-service.service.ts`

## Dependencies
- `HttpClient` from `@angular/common/http`: For making HTTP requests.
- `Observable` from `rxjs`: For managing asynchronous operations.

## API Base URL

```typescript
private baseUrl = 'http://localhost:8080';
```

---

## Methods

### `postComment(codelabId: string, username: string, comment: string): Observable<any>`
Posts a comment on a specific codelab by a user.

- **HTTP Method:** `POST`
- **Endpoint:** `/codelabs/{codelabId}/comments/{username}`
- **Parameters:**
  - `codelabId`: The ID of the codelab to comment on.
  - `username`: The username of the user posting the comment.
  - `comment`: The text content of the comment.
- **Returns:** `Observable<any>` – The response from the backend (e.g., confirmation or created comment object).

#### Example

```typescript
this.commentService.postComment('5', 'alice', 'Great explanation!').subscribe(response => {
  console.log('Comment posted:', response);
});
```
