import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';


@Component({
  selector: 'app-login',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
