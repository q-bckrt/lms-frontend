import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  handleCreate() {}
}
