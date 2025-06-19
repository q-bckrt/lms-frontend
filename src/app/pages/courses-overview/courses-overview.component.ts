import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './courses-overview.component.html',
  styleUrl: './courses-overview.component.css'
})
export class CoursesOverviewComponent implements OnInit {
  courses: Array<{ id: number; title: string }> = [];

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit() {
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

  editCourse(id: number) {
    this.router.navigate(['/edit-course', id]);
  }
}
