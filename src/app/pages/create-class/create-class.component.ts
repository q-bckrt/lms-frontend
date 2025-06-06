import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-create-class',
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css'
})
export class CreateClassComponent {
  handleCreate() {}
}
