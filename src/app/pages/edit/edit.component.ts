import { Component } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-edit',
    imports: [
        ButtonComponent,
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

}
