import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-create-codelab',
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './create-codelab.component.html',
  styleUrl: './create-codelab.component.css'
})
export class CreateCodelabComponent {
  handleCreate() {}
}
