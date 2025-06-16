# LMS Frontend Project Structure

## Overview
The LMS (Learning Management System) frontend is built using Angular and follows a modular architecture with clear separation of concerns.

## Directory Structure

### `/src/app`
- **`/components`**: Reusable UI components
  - Navbar
  - Footer
  - Button
  - Other shared components

- **`/pages`**: Main application pages
  - Dashboard
  - Login
  - Registration
  - Other page components

- **`/services`**: Business logic and data services
  - Authentication service (deprecated)
  - User service
  - Keycloak integration

### Key Files
- `app.routes.ts`: Application routing configuration
- `app.component.ts`: Root component
- `app.config.ts`: Application configuration

## State Management
- User authentication state is managed through services
- Role-based access control is implemented

## Styling
- Component-scoped CSS
- Global styles in the assets directory
- Responsive design implementation
