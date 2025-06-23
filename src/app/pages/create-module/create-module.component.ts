import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModuleService} from '../../services/module.service';
import { CourseService } from '../../services/course.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-create-module',
  imports: [NavbarComponent, FooterComponent, ButtonComponent, FormsModule, NgForOf],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css',
  standalone: true
})

// Later will require a dropdown to select the course and add it right after
// the creation of the module
export class CreateModuleComponent implements OnInit {

  courses: Array<{ id: number; title: string }> = [];
  selectedCourseId!: number;

  constructor(private moduleService: ModuleService, private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Courses loaded:', courses);
      },
      error: (err) => {
        console.error('Failed to load courses:', err);
        alert('Failed to load courses. Please try again later.');
      }
    }
    );
  }


  handleCreateModule() {
    console.log("ENTERING MODULE CREATION COMPONENT");
    const title = (document.getElementById('title') as HTMLInputElement).value.trim();

    if (!title) {
      alert('Please enter a module title');
      return;
    }

    if (!this.selectedCourseId) {
      alert('Please select a course for the module');
      return;
    }

    const module = {title};

    this.moduleService.createModule(module).subscribe({
      next: (response) => {
        console.log('Module created successfully:', response);
        alert('Module created successfully');

        const moduleId = response.id;
        const courseId = this.selectedCourseId;

        this.courseService.addModuleToCourse(courseId, moduleId).subscribe({
          next: (courseResponse) => {
            console.log('Module added to course successfully:', courseResponse);
            alert('Module added to course successfully');
          },
          error: (courseErr) => {
            console.error('Error adding module to course:', courseErr);
            alert('Failed to add module to course. Please try again.');
          }
        })
      },
      error: (err) => {
        console.error('Error creating module:', err);
        alert('Failed to create module. Please try again.');
      }
    });
  }
}
