import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
