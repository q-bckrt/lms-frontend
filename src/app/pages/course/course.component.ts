import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {NgFor, NgIf} from '@angular/common';
import {ModuleService} from '../../services/module.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import {forkJoin} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {RoleService} from '../../services/role-service.service';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-modules-overview',
  standalone: true,
    imports: [NavbarComponent, FooterComponent, NgFor, FormsModule, NgIf],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit, AfterViewInit {
  @ViewChild('addExistingModuleModal') modalElement!: ElementRef;

  modules: Array<{ id: number; title: string }> = [];
  extModules: Array<{ id: number; title: string }> = [];
  courseId!: number;
  courseTitle: string = '';
  editedCourseTitle: string = '';
  newModuleTitle: string = '';
  selectedModuleId!: number;
  loading: boolean = true;
  isCoach: boolean = false;
  courseProgress: number = 0;
  userName: string = ''

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private keycloakService: KeycloakServiceService
  ) { }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.isCoach = this.roleService.isCoach()
    this.userName = this.keycloakService.getTokenUserName();

    // fetch both the course and the full module list in parallel
    forkJoin({
      course: this.courseService.getOneCourse(this.courseId),
      allModules: this.moduleService.getAllModules(),
    }).subscribe(({ course, allModules }) => {
      console.log(allModules);
      this.courseTitle = course.title;
      // filter down to only the modules linked to this course
      this.modules = allModules.filter((mod: any) =>
        mod.parentCourses.includes(course.id)
      );
      this.loading=false
    });

    this.courseService.getProgressPercentageCourse(this.userName,this.courseId).subscribe({
      next: progress => {
        this.courseProgress = progress
        console.log(`course progress set successfully: ${progress} percent`)
      },
      error: err => console.error("failed to fetch course progress")
    })

  }

  ngAfterViewInit(): void {
    const modal = this.modalElement.nativeElement;
    modal.addEventListener('shown.bs.modal', () => {
      this.onModalOpened();
    });
  }

  onModalOpened(): void {
    console.log('Modal opened!');
    this.moduleService.getAllModules().subscribe(modules => {
      this.extModules = modules.filter((mod: any) => !this.modules.some(m => m.id === mod.id));
      console.log("extModules:", this.extModules);
    })
  }

  handleUpdateCourseTitle() {
    this.courseService.updateCourseTitle(this.courseId, { title: this.editedCourseTitle }).subscribe(() => {
      this.courseTitle = this.editedCourseTitle;

      const modalEl = document.getElementById('editCourseModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();

      console.log('Course title updated');
    })
  }

  handleCreateNewModule() {
    this.moduleService.createModule({ title: this.newModuleTitle }).subscribe((response) => {
      console.log('New module created:', response);

    this.courseService.addModuleToCourse(this.courseId, response.id).subscribe(() => {
      console.log('Module added to course');
      // refresh the module list
      this.moduleService.getAllModules().subscribe(modules => {
        this.modules = modules.filter((mod: any) =>
          mod.parentCourses.includes(this.courseId)
        );
      });
    })
      const modalEl = document.getElementById('createModuleModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    })
  }

  handleAddExistingModule() {
    this.courseService.addModuleToCourse(this.courseId, this.selectedModuleId).subscribe(() => {
      console.log('Module added to course');
      // refresh the module list
      this.moduleService.getAllModules().subscribe(modules => {
        this.modules = modules.filter((mod: any) =>
          mod.parentCourses.includes(this.courseId)
        );
      });

      const modalEl = document.getElementById('addExistingModuleModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    })
  }

  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}
