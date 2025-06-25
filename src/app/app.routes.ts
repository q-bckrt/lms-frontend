import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {OverviewComponent} from './pages/overview/overview.component';
import {ClassComponent} from './pages/class/class.component';
import { CourseComponent } from './pages/course/course.component';
import { ModuleComponent } from './pages/module/module.component';
import { SubmoduleComponent } from './pages/submodule/submodule.component';
import { roleGuard } from './guards/role-guard.guard';
import {ViewProfileComponent} from './pages/view-profile/view-profile.component';
import {CodelabComponent} from './pages/codelab/codelab.component';
import {CommentComponent} from './pages/comment/comment.component';


// Following the refactoring of the structure, those route names should be updated too after consulting with the team.
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'view-student-profile/:userName', component: ViewProfileComponent, canActivate: [roleGuard], data: { role: 'coach' }},
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview', component: OverviewComponent },

  { path: 'courses/:id', component: CourseComponent },
  { path: 'modules/:id', component: ModuleComponent },
  { path: 'submodules/:id', component: SubmoduleComponent },
  { path: 'class-overview/:id', component: ClassComponent},
  { path: 'codelabs/:id', component: CodelabComponent },
  { path: 'codelabs/:id/comment', component: CommentComponent}
];
