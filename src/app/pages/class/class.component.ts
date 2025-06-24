  import {Component, inject, OnInit} from '@angular/core';
  import {NavbarComponent} from '../../components/navbar/navbar.component';
  import {FooterComponent} from '../../components/footer/footer.component';
  import {NgFor, NgIf} from '@angular/common';
  import {UserService} from '../../services/user-service.service';
  import {classOverviewModel} from '../../models/classOverviewModel';
  import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';
  import {ActivatedRoute, Router} from '@angular/router';
  import {RoleService} from '../../services/role-service.service';
  import {ClassService} from '../../services/class-service.service';
  import {CourseService} from '../../services/course.service';
  import {courseModel} from '../../models/courseModel';
  import {map} from 'rxjs';
  import {FormsModule, ReactiveFormsModule} from '@angular/forms';

  @Component({
    selector: 'app-class',
    imports: [
      NavbarComponent,
      FooterComponent,
      NgFor,
      NgIf,
      ReactiveFormsModule,
      FormsModule
    ],
    templateUrl: './class.component.html',
    styleUrl: './class.component.css'
  })
  export class ClassComponent implements OnInit{
    private router = inject(Router);
    private classService = inject(ClassService);
    private userService = inject(UserService);
    private courseService = inject(CourseService)
    roleService = inject(RoleService);
    private keycloakService = inject(KeycloakServiceService);
    private route = inject(ActivatedRoute);

    classId: number = 0;
    classOverviews: classOverviewModel[] = [];
    selectedClassOverview: classOverviewModel | null = null;
    allCourses: courseModel[] = [];
    selectedCourse: courseModel | null = null;
    isUserCoach: boolean = false

    loading: boolean = true;


    ngOnInit() {
      const userName = this.keycloakService.getTokenUserName()
      this.classId = Number(this.route.snapshot.paramMap.get('id')!);
      this.isUserCoach = this.roleService.isCoach()

      this.courseService.getAllCourses().pipe(
        map(responseList =>
        responseList.map( response => ({
          id: response.id,
          title: response.title
          })
        )
        )
      ).subscribe({
        next: (courses) => {
          this.allCourses = courses;
          console.log("list of courses set")
        },
        error: (error) => {
          console.error("failed to set allCourses")
        }
      })

      this.userService.getClassOverviews(userName).subscribe({
        next: (overviews) => {
          this.classOverviews = overviews;
          console.log("class overview list is set")
          this.selectClass(this.classId)
          console.log("class is selected")
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch class overview list:', err);
          this.loading = false;
        }
      });

    }

    private selectClass(classId: number): void {
      const foundClass = this.classOverviews.find(c => c.id === classId);
      if(foundClass){
        this.selectedClassOverview = foundClass
        console.log(`class with id ${classId} and title ${this.selectedClassOverview.title} selected`)
      } else {
        console.error(`classId ${classId} not found in list of classes`)
      }
    }

    goTo(path: string) {
      console.log('Button clicked');
      this.router.navigate([path]);
    }

    linkCourse() {
      console.log(this.selectedCourse?.title)
      if (this.selectedClassOverview && this.selectedCourse) {
        console.log(this.selectedCourse)
        this.classService.linkCourseToClass(this.selectedClassOverview.id, this.selectedCourse.id).subscribe({
          next: () => {
            this.selectedClassOverview!.courseTitle=this.selectedCourse!.title;
            this.selectedClassOverview!.courseId=this.selectedCourse!.id;
            console.log(`Class with ID ${this.selectedClassOverview!.id} and title "${this.selectedClassOverview!.title}" linked to course with ID ${this.selectedCourse!.id}`);
            //alert(`Class "${this.selectedClassOverview!.title}" linked to course with ID ${this.selectedCourse!.id}`)
          },
          error: (err) => {
            console.error("Failed to link class to course:", err);
          }
        });
      } else {
        console.error("No course selected or selectedClassOverview is null");
      }
    }

  }
