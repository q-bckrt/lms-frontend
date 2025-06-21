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


@Component({
  selector: 'app-modules-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './modules-overview.component.html',
  styleUrl: './modules-overview.component.css'
})
export class ModulesOverviewComponent implements OnInit {
  modules: Array<{ id: number; title: string }> = [];
  courseId!: number;
  courseTitle: string = 'Course Title'; // Placeholder for course title, can be set dynamically

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


  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}
