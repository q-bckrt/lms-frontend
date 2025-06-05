import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-courses-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './courses-overview.component.html',
  styleUrl: './courses-overview.component.css'
})
export class CoursesOverviewComponent {
  courses = [
    { id: 1, name: 'Course A' },
    { id: 2, name: 'Course B' }
  ]; // Dummy data

  constructor(private router: Router) {}

  editCourse(id: number) {
    this.router.navigate(['/edit-course', id]);
  }
}
