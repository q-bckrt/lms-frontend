import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import {NgForOf, NgIf} from '@angular/common';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';
import { UserService } from '../../services/user-service.service';
import {Router, RouterLink} from '@angular/router';
import { RoleService } from '../../services/role-service.service';
import {CourseService} from '../../services/course.service';
import {ClassService} from '../../services/class-service.service';
import {classModel} from '../../models/classModel';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, ButtonComponent, NgIf, NgForOf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userRole = '';
  firstName = '';
  username= '';
  courses: Array<{ id: number; title: string }> = [];
  courseStudent?: {id: number; title: string};
  classes: classModel[] = [];
  courseId?: number;


  constructor(
    private keycloakService: KeycloakServiceService,
    private userService: UserService,
    private router: Router,
    public roleService: RoleService,
    private courseService: CourseService,
    private classService: ClassService
  ) {}

  ngOnInit() {
    this.initializeUserData();
    this.classService.findClassesPerUser(this.username).subscribe({
      next: (classes) => {
        this.classes = classes;
        if (!classes || classes.length === 0) {
          alert('You are not assigned to any class yet.');
        }
        this.handleStudentCourseLoad();
      },
      error: (err) => {
        console.error('Failed to load classes:', err);
        alert('Failed to load classes. Please try again later.');
      }
    })
    // only coach need to have all courses
    if(this.roleService.isCoach()){
      this.courseService.getAllCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
        },
        error: (err) => {
          console.error('Failed to load courses:', err);
          alert('Failed to load courses. Please try again later.');
        }
      })
    }
  }

  // What is the way of getting the first and last name of the user?
  private initializeUserData() {
    const token = this.keycloakService.getToken();
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        this.firstName = tokenData.given_name || '';
        this.username = tokenData.preferred_username;
        this.roleService.userRole$.subscribe(role => {
          this.userRole = role;
        });
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }

  private handleStudentCourseLoad() {
    if (this.roleService.isStudent() && this.classes.length > 0) {
      const firstClass = this.classes[0];
      if (firstClass?.courseId) {
        this.courseId = firstClass.courseId;
        this.courseService.getOneCourse(this.courseId).subscribe(course => {
          this.courseStudent = course;
        });
      }
    }
  }

  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}
