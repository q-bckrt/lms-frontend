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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, ButtonComponent, NgIf, NgForOf, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userRole = '';
  firstName = '';

  userName = '';

  courses: Array<{ id: number; title: string }> = [];
  courseStudent?: {id: number; title: string};
  classes: classModel[] = [];

  newCourseTitle: string = '';
  newClassTitle: string = '';

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
    this.classService.findClassesPerUser(this.userName).subscribe({
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

  private initializeUserData() {
    const token = this.keycloakService.getToken();
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        this.firstName = tokenData.given_name || '';

        this.userName = tokenData.preferred_username || '';

        this.roleService.userRole$.subscribe(role => {
          this.userRole = role;
        });
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }


  handleCreateNewCourse() {
    this.courseService.createCourse({ title: this.newCourseTitle }).subscribe((response) => {
      console.log('New course created:', response);

      // refresh the course list
      this.courseService.getAllCourses().subscribe(courses => {
        this.courses = courses;
      });

      const modalEl = document.getElementById('createCourseModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    })
  }

  handleCreateNewClass() {
    this.classService.createClass(this.newClassTitle, this.userName).subscribe((response) => {
      console.log('New class created:', response);

      // refresh the class list
      this.classService.findAllClasses().subscribe(classes => {
        this.classes = classes;
      });

      const modalEl = document.getElementById('createClassModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    })
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
