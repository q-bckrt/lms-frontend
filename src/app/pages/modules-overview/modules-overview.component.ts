import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import {ModuleService} from '../../services/module.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import {forkJoin} from 'rxjs';
import {FormsModule} from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-modules-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor, FormsModule],
  templateUrl: './modules-overview.component.html',
  styleUrl: './modules-overview.component.css'
})
export class ModulesOverviewComponent implements OnInit {
  modules: Array<{ id: number; title: string }> = [];
  courseId!: number;
  courseTitle: string = '';
  editedCourseTitle: string = '';
  newModuleTitle: string = '';

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

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
    });
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
      // should navigate to the new module's overview page ???
      // this.router.navigate(['/modules', response.id]);

    })
  }

  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}
