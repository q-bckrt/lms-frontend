import { Component } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-register',
    imports: [
        ButtonComponent,
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
