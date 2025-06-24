import {Component, inject} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';
import {Router} from '@angular/router';
import {ClassService} from '../../services/class-service.service';
import {RoleService} from '../../services/role-service.service';

@Component({
  selector: 'app-create-class',
  imports: [NavbarComponent, FooterComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css'
})

export class CreateClassComponent {
  classService = inject(ClassService);
  keycloakService = inject(KeycloakServiceService)
  roleService = inject(RoleService);
  router = inject(Router);

  private validateTitle(title: string): boolean {
    if (!title.trim()) {
      return false
    }
    return true
  }

  handleCreate() {
    const inputTitle: string = (document.getElementById('title') as HTMLInputElement).value.trim();
    const userName: string = this.keycloakService.getTokenUserName()
    console.log(inputTitle)
    console.log(userName)

    if(this.validateTitle(inputTitle) && this.roleService.isCoach()) {
      this.classService.createClass(inputTitle, userName).subscribe({
        next: (response) => {
          console.log('Class created successfully:', response);
          alert('Class created successfully');
        },
        error: (err) => {
          console.error('Error creating Class:', err);
          alert('Failed to create class. Please try again.');
        }
      })

    } else {
      throw new Error('Form field or user role invalid')
    }
  }
}
