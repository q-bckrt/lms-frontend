import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {EditComponent} from "./pages/edit/edit.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {OverviewComponent} from './pages/overview/overview.component';
import {ClassComponent} from './pages/class/class.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CreateClassComponent } from './pages/create-class/create-class.component';
import { CreateModuleComponent } from './pages/create-module/create-module.component';
import { CreateCodelabComponent } from './pages/create-codelab/create-codelab.component';
import { CoursesOverviewComponent } from './pages/courses-overview/courses-overview.component';
import { ModulesOverviewComponent } from './pages/modules-overview/modules-overview.component';
import { CodelabsOverviewComponent } from './pages/codelabs-overview/codelabs-overview.component';
import { roleGuard } from './guards/role-guard.guard';

// Following the refactoring of the structure, those route names should be updated too after consulting with the team.
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit', component: EditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'class', component: ClassComponent },
  { path: 'create-course', component: CreateCourseComponent, canActivate: [roleGuard], data: { role: 'coach' } },
  { path: 'create-class', component: CreateClassComponent, canActivate: [roleGuard], data: { role: 'coach' } },
  { path: 'create-module', component: CreateModuleComponent, canActivate: [roleGuard], data: { role: 'coach' } },
  { path: 'create-codelab', component: CreateCodelabComponent, canActivate: [roleGuard], data: { role: 'coach' } },
  { path: 'courses', component: CoursesOverviewComponent },
  { path: 'modules/:id', component: ModulesOverviewComponent },
  { path: 'codelabs', component: CodelabsOverviewComponent }
];
