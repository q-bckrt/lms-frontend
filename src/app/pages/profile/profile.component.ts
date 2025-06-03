import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router) {}

  goToEdit() {
    this.router.navigate(['/edit']);
  }
}
