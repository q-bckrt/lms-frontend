# LMS Frontend Project Structure

## Overview
The LMS (Learning Management System) frontend is built using Angular and follows a modular architecture that promotes scalability, reusability, and maintainability. The app is structured to separate UI, logic, and routing clearly.

## Directory Structure

### `/src/app`

#### `components/`
Reusable UI building blocks:
- **`button/`** – Shared button components.
- **`footer/`** – Footer UI components.
- **`navbar/`** – Navigation bar components.
- Other reusable components can be added here.

#### `guards/`
Contains route guards used to control access based on roles or authentication status:
- `role-guard.guard.ts` – Implements role-based access control logic.

#### `models/`
TypeScript interfaces used throughout the app:
- Interfaces for classes, user profiles, codelab progress, and other core entities.

#### `pages/`
Feature-based folders representing main views and page modules:
- **`class/`** – Class-related views.
- **`codelab/`** – Views for codelab creation and interaction.
- **`course/`** – Course creation, editing, and overview.
- **`dashboard/`** – Main user dashboard.
- **`edit-profile/`** – Profile editing functionality.
- **`home/`** – Public homepage.
- **`login/`** – User login page.
- **`module/`** – Module management and views.
- **`overview/`** – Generic overviews and resource listings.
- **`profile/`** – User profile display.
- **`register/`** – User registration interface.
- **`submodule/`** – Submodule creation and editing.
- **`view-profile/`** – Read-only user profile display.


#### `services/`
Business logic, HTTP communication, and external integration:
- **Authentication and Authorization**
  - `role-service.service.ts` – Handles role-based access operations.
- **Domain Services**
  - `user-service.service.ts`, `course.service.ts`, `module.service.ts`, `submodule.service.ts`, `class-service.service.ts`, `codelab.service.ts`, `comment.service.ts` – Manage respective domain operations.
- **Keycloak Integration (`keycloak/`)**
  - `keycloak-service.service.ts`, `http-keycloak.service.ts` – Custom Keycloak logic.
  - `keycloak.interceptor.ts` – HTTP interceptor to attach tokens.
  - `keycloak-token-response.ts` – Token response types.
  - Corresponding `.spec.ts` files for testing.

### Key Files
- `app.routes.ts` – Application routing configuration.
- `app.component.ts` – Root component that wraps all pages.
- `app.config.ts` – Central configuration (e.g., environments, tokens, APIs).

## State Management
- Authentication and user session are managed through Keycloak services.
- Guards enforce role-based access to routes.

## Styling
- The app uses a Bootstrap theme for consistent styling.
- Bootstrap utility classes are used throughout for layout, spacing, and UI behavior.
- Global styles are included in `styles.scss`.

