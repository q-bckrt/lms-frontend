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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit', component: EditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'class', component: ClassComponent },
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'create-class', component: CreateClassComponent },
  { path: 'create-module', component: CreateModuleComponent },
  { path: 'create-codelab', component: CreateCodelabComponent },
  { path: 'courses', component: CoursesOverviewComponent }
];
