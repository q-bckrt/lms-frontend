import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
  standalone: true
})
export class CreateCourseComponent {

  constructor(private courseService: CourseService) {}

  handleCreateCourse() {
    console.log("ENTERING COURSE CREATION COMPONENT");
    const title = (document.getElementById('title') as HTMLInputElement).value.trim();

    if (!title) {
      alert('Please enter a course title');
      return;
    }

    const course = { title };

    this.courseService.createCourse(course).subscribe({
      next: (response) => {
        console.log('Course created successfully:', response);
        alert('Course created successfully');
      },
      error: (err) => {
        console.error('Error creating course:', err);
        alert('Failed to create course. Please try again.');
      }
    });
  }
}
