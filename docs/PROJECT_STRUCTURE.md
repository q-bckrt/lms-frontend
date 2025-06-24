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
- `role-guard.guard.spec.ts` – Unit tests for the role guard.

#### `pages/`
Contains the main application views and functional page modules:
- **`class/`** – Class-related views.
- **`codelabs-overview/`**, **`modules-overview/`**, **`courses-overview/`** – Overview pages for different resources.
- **`create-class/`**, **`create-module/`**, **`create-course/`**, **`create-codelab/`** – Pages for resource creation.
- **`dashboard/`** – Main dashboard for logged-in users.
- **`edit/`** – Profile or resource editing views.
- **`home/`** – Public homepage.
- **`login/`** – Login screen.
- **`profile/`** – User profile page.
- **`register/`** – User registration page.
- **`overview/`** – General overview or catch-all UI.

#### `services/`
Business logic, HTTP communication, and external integration:
- **Authentication and Authorization**
  - `role-service.service.ts` – Handles role-based access operations.
- **User and Course Management**
  - `user-service.service.ts`, `course-service.service.ts`, `module-service.service.ts` – Core service files for respective domains.
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
- Styles are mostly scoped at the component level using Angular's encapsulation.
- Global styles are placed in the `assets` directory or `styles.scss`.
- Responsive design is considered across components and layouts.
